package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func GetAccounts(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	var accounts []models.Account
	errQuery := db.Raw("CALL get_accounts(?)", id_User).Scan(&accounts).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL create_account(?,?,?,?)", account.Name, account.Credit, id_User, account.Limit_amount).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL update_account(?,?,?,?)", account.Id, account.Name, account.Credit, account.Limit_amount).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	filters := context.Queries()
	var totals []models.AccountTotalResponse
	id_account, errParseAccount := strconv.Atoi(filters["id_account"])
	if errParseAccount != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	err := db.Raw("CALL get_total_waste_by_account(?,?,?,?)", id_User, id_account, filters["init"], filters["end"]).Scan(&totals).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	if id_account > 0 {
		return context.JSON(fiber.Map{
			"data":   totals[0],
			"status": status,
		})
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   totals,
		"status": status,
	})
}

func DeleteAccount(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	errQuery := db.Exec("CALL delete_account(?)", account.Id).Error
	defer dbClose()
	if errQuery != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
