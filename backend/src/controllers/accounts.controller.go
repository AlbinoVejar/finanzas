package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func GetAccounts(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var accounts []models.Account
	errQuery := db.Raw("CALL get_accounts()").Scan(&accounts).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrNotFound.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   accounts,
		"status": status,
	})
}

func CreateAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Raw("CALL create_account(?,?)", account.Name, account.Credit).Error
	if errQuery != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(errQuery)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Raw("CALL update_account(?,?)", account.Name, account.Credit).Error
	if errQuery != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(errQuery)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
