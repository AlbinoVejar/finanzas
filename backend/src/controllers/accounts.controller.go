package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func GetAccounts(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func CreateAccount(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func UpdateAccount(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}
