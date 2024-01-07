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
	rows, err := db.Query("CALL get_categories()")
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	for rows.Next() {
		var id int
		var name string
		var created_at string
		if err := rows.Scan(&id, &name, &created_at); err != nil {
			panic(err)
		}
		category := models.Category{
			Id:         id,
			Name:       name,
			Created_At: created_at,
		}
		categories = append(categories, category)
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
	_, err := db.Exec("CALL create_category(?)", category.Name)
	if err != nil {
		status = fiber.ErrNotAcceptable.Code
		panic(err)
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
