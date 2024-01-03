package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
)

func RoutesCategories(app *fiber.App) {
	route := app.Group("/categories")

	route.Get("/", controllers.GetCategories)
	route.Post("/", controllers.CreateCategory)
}
