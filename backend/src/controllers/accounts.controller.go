package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func GetAccounts(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var accounts []models.Account
	errQuery := db.Raw("CALL get_accounts(?)", id_User).Scan(&accounts).Error
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
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL create_account(?,?,?,?)", account.Name, account.Credit, id_User, account.Limit_amount).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)

}

func UpdateAccount(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL update_account(?,?,?,?)", account.Id, account.Name, account.Credit, account.Limit_amount).Error
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetTotalsAccounts(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	filter_dates := context.Queries()
	var totals []models.AccountTotalResponse
	err := db.Raw("CALL get_total_expense_by_account(?,?,?)", id_User, filter_dates["init"], filter_dates["end"]).Scan(&totals).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   totals,
		"status": status,
	})
}
