package controllers

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
)

func GetCategories(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var categories []models.Category
	err := db.Raw("CALL get_categories(?)", id_User).Scan(&categories).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   categories,
		"status": status,
	})
}

func CreateCategory(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL create_category(?,?)", id_User, category.Name).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateCategory(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL update_category(?,?)", category.Id, category.Name).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func DeleteCategory(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL delete_category(?)", category.Id).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetDetailsCategory(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var expenses []models.ResumeExpense
	var config models.DetailCategory
	context.BodyParser(&config)
	err := db.Raw("CALL get_details_category(?,?,?)", config.Id, config.Page_number, config.Row_per_page).Scan(&expenses).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   expenses,
		"status": status,
	})
}
