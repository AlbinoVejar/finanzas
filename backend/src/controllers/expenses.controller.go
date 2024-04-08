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

func GetResumeCategories(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var expenses []models.ResumeExpense
	var user models.User
	var categories []models.Category
	var accounts []models.Account
	context.BodyParser(&user)
	errCategories := db.Raw("CALL get_categories(?)", user.Id).Scan(&categories).Error
	if errCategories != nil {
		categories = nil
		println(errCategories)
	}
	errAccounts := db.Raw("CALL get_accounts(?)", user.Id).Scan(&accounts).Error
	if errAccounts != nil {
		accounts = nil
		println(errAccounts)
	}
	err := db.Raw("CALL get_resume_category(?)", user.Id).Scan(&expenses).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data": fiber.Map{
			"accounts":   accounts,
			"categories": categories,
			"expenses":   expenses,
		},
		"status": status,
	})
}
