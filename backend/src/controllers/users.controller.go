package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/utils"
)

func Login(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func GetUser(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func CreateUser(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var newUser models.User
	context.BodyParser(&newUser)
	passEncoded, err := utils.EncodedPass(newUser.Password)
	if err != nil {
		panic(err)
	}
	_, err = db.Query("CALL create_user(?,?,?)", newUser.Name, newUser.Email, passEncoded)
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateUser(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var newUser models.User
	context.BodyParser(&newUser)
	passEncoded, err := utils.EncodedPass(newUser.Password)
	if err != nil {
		panic(err)
	}
	_, errQuery := db.Query("CALL update_user(?,?,?)", newUser.Name, newUser.Email, passEncoded)
	if errQuery != nil {
		status = fiber.ErrNotAcceptable.Code
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
