package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func InitController(c *fiber.Ctx) (int, int) {
	var status = fiber.StatusOK
	idUser, err := middlewares.GetIdUser(c)
	if err != nil {
		status = fiber.StatusUnauthorized
	}
	return idUser, status
}
