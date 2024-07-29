package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func UpdateExpense(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	id_account, _ := context.ParamsInt("id")
	db := config.Connection()
	var expense models.Expense
	context.BodyParser(&expense)
	err := db.Exec("CALL update_expense(?,?,?,?)",
		id_account,
		expense.Description,
		expense.Amount,
		expense.Date_expense).Error
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
	db := config.Connection()
	var expense models.NewExpense
	context.BodyParser(&expense)
	err := db.Exec("CALL create_expense(?,?,?,?,?,?)",
		id_User,
		expense.Id_rel_Account,
		expense.Id_rel_Category,
		expense.Description,
		expense.Amount,
		expense.Date_expense).Error
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
	db := config.Connection()
	filter_dates := context.Queries()
	var expenses []models.ExpenseByAccount
	var config models.TotalExpenseRequest
	context.BodyParser(&config)
	err := db.Raw("CALL get_expenses_by_account(?,?,?,?)", id_User, config.Id_account, filter_dates["init"], filter_dates["end"]).Scan(&expenses).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   expenses,
		"status": status,
	})
}
