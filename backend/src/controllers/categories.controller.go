package controllers

import "github.com/gofiber/fiber/v2"

func GetCategories(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func CreateCategory(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}
