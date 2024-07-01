package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func UpdateExpense(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var expense models.Expense
	context.BodyParser(&expense)
	err := db.Exec("CALL update_expense(?,?)", expense.Description, expense.Amount).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)

	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func CreateExpense(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var expense models.NewExpense
	context.BodyParser(&expense)
	err := db.Exec("CALL create_expense(?,?,?,?)", expense.Id_rel_Category, expense.Description, expense.Amount, expense.Id_rel_Account).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)

	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetExpensesByAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	id_account, _ := context.ParamsInt("id")
	db := config.Connection()
	var expenses []models.ExpenseByAccount
	var config models.UserDashboard
	context.BodyParser(&config)
	err := db.Raw("CALL get_expenses_by_accounts(?,?,?,?)", config.Id_User, id_account, config.Init_date, config.End_date).Scan(&expenses).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   expenses,
		"status": status,
	})
}
