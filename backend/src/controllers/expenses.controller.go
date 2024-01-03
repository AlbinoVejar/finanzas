package controllers

import "github.com/gofiber/fiber/v2"

func UpdateExpense(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}
