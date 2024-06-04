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
		return context.SendStatus(fiber.ErrBadRequest.Code)
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

func GetTotalsByCategory(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var expenses []models.TotalCategory
	var config models.UserDashboard
	context.BodyParser(&config)
	err := db.Raw("CALL get_totals_account(?,?,?,?)", config.Id, config.Id_account, config.Init_date, config.End_date).Scan(&expenses).Error
	if err != nil {
		return context.SendStatus(fiber.ErrBadRequest.Code)
	}
	status = fiber.StatusOK
	return context.JSON(fiber.Map{
		"data":   expenses,
		"status": status,
	})
}
