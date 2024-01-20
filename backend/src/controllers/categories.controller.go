package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func GetCategories(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var categories []models.Category
	err := db.Raw("CALL get_categories()").Scan(&categories).Error
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   categories,
		"status": status,
	})
}

func CreateCategory(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL create_category(?)", category.Name).Error
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
