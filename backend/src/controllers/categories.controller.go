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
	db, dbClose := config.Connection()
	var categories []models.Category
	err := db.Raw("CALL get_categories(?)", id_User).Scan(&categories).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL create_category(?,?)", id_User, category.Name).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL update_category(?,?)", category.Id, category.Name).Error
	defer dbClose()
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
	db, dbClose := config.Connection()
	var category models.Category
	context.BodyParser(&category)
	err := db.Exec("CALL delete_category(?)", category.Id).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func GetTotalsCategory(context *fiber.Ctx) error {
	id_User, status := InitController(context)
	if id_User == 0 {
		return context.SendStatus(status)
	}
	db, dbClose := config.Connection()
	var totals []models.TotalCategory
	var config models.TotalCategoryRequest
	context.BodyParser(&config)
	filter_dates := context.Queries()
	err := db.Raw("CALL get_categories_by_account(?,?,?,?)", id_User, config.Id_account, filter_dates["init"], filter_dates["end"]).Scan(&totals).Error
	defer dbClose()
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   totals,
		"status": status,
	})
}
