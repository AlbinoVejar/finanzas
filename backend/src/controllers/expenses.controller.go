package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
	models_shared "gitlab.com/AlbinoVejar/finanzas/backend/src/models/shared"
)

func UpdateExpense(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	id_account, _ := context.ParamsInt("id")
	db, dbClose := config.Connection()
	var expense models.ExpenseRequest
	context.BodyParser(&expense)
	err := db.Exec("CALL update_expense(?,?,?,?,?,?)",
		id_account,
		expense.Id_rel_Account,
		expense.Id_rel_Category,
		expense.Description,
		expense.Amount,
		expense.Date_expense).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)

	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func CreateExpense(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	var expense models.NewExpense
	context.BodyParser(&expense)
	err := db.Exec("CALL create_expense(?,?,?,?,?,?)",
		id_User,
		expense.Id_rel_Account,
		expense.Id_rel_Category,
		expense.Description,
		expense.Amount,
		expense.Date_expense).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)

	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetExpensesByAccount(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	filters := context.Queries()
	var expenses []models.ExpenseByAccount
	var params models.TotalExpenseRequest
	context.BodyParser(&params)
	id_rel_account, _ := strconv.Atoi(filters["id_account"])
	err := db.Raw("CALL get_expenses_by_account(?,?,?,?)", id_User, id_rel_account, filters["init"], filters["end"]).Scan(&expenses).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   expenses,
		"status": status,
	})
}

func DeleteExpense(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	id, _ := context.ParamsInt("id")
	db, dbClose := config.Connection()
	err := db.Exec("CALL delete_expense(?,?)", id, id_User).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   true,
		"status": status,
	})
}

func GetDashboardByUser(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	filters := context.Queries()
	var expenses []models.ExpenseDetails
	var accounts []models.AccountTotalResponse
	var response models_shared.AccountExpensesResponse
	err := db.Raw("CALL get_expenses_by_date(?,?,?)", id_User, filters["current"], filters["current"]).Scan(&expenses).Error
	errAccount := db.Raw("CALL get_total_waste_by_account(?,?,?,?)", id_User, 0, filters["init"], filters["end"]).Scan(&accounts).Error
	defer dbClose()
	response.Accounts = accounts
	response.Expenses = expenses
	if len(expenses) > 0 {
		for _, item := range expenses {
			response.Total += item.Amount
		}
	}
	if err != nil || errAccount != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   response,
		"status": status,
	})
}
