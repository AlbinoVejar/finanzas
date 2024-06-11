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
	errQuery := db.Raw("CALL get_accounts(1)").Scan(&accounts).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   accounts,
		"status": status,
	})
}

func GetAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var accounts []models.Account
	errQuery := db.Raw("CALL get_account(1)").Scan(&accounts).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
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
	errQuery := db.Exec("CALL create_account(?,?,?)", account.Name, account.Credit, 1).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL update_account(?,?)", account.Name, account.Credit).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetTotalsByAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var totals []models.AccountTotalResponse
	var config models.AccountTotalRequest
	context.BodyParser(&config)
	err := db.Raw("CALL get_totals_accounts(?,?,?)", config.IdUser, config.Init_date, config.End_date).Scan(&totals).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   totals,
		"status": status,
	})
}
