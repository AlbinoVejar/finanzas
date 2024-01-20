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
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
