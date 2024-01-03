package controllers

import "github.com/gofiber/fiber/v2"

func Login(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func GetUser(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func CreateUser(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func UpdateUser(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}
