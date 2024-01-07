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
	rows, err := db.Query("CALL get_accounts()")
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	for rows.Next() {
		var id int
		var name string
		var credit bool
		var created_at string
		var modified string
		var deleted string
		if err := rows.Scan(&id, &name, &credit, &created_at, &modified, &deleted); err != nil {
			panic(err)
		}
		account := models.Account{
			Id:         id,
			Name:       name,
			Credit:     credit,
			Created_At: created_at,
			Modified:   modified,
			Deleted:    deleted,
		}
		accounts = append(accounts, account)
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
	_, err := db.Exec("CALL create_account(?,?)", account.Name, account.Credit)
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateAccount(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var account models.Account
	context.BodyParser(&account)
	_, err := db.Exec("CALL update_account(?,?)", account.Name, account.Credit)
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
