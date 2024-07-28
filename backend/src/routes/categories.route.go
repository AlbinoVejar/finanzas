package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func RoutesCategories(app *fiber.App) {
	route := app.Group("/categories")

	route.Get("/", middlewares.Protected(), controllers.GetCategories)
	route.Post("/", middlewares.Protected(), controllers.CreateCategory)
	route.Put("/", middlewares.Protected(), controllers.UpdateCategory)
	route.Delete("/", middlewares.Protected(), controllers.DeleteCategory)
}
