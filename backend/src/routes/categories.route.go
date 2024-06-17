package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
)

func RoutesCategories(app *fiber.App) {
	route := app.Group("/categories")

	// route.Get("/", middlewares.Protected(), controllers.GetCategories)
	// route.Post("/", middlewares.Protected(), controllers.CreateCategory)
	route.Get("/", controllers.GetCategories)
	route.Post("/", controllers.CreateCategory)
	route.Post("/details", controllers.GetDetailsCategory)
	// route.Post("/totals", controllers.GetTotalsByCategory)
}
