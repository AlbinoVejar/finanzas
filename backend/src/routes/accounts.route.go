package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
)

func RoutesAccounts(app *fiber.App) {
	route := app.Group("/accounts")

	route.Get("/", controllers.GetAccounts)
	route.Post("/", controllers.CreateAccount)
	route.Put("/", controllers.UpdateAccount)
	// route.Get("/", middlewares.Protected(), controllers.GetAccounts)
	// route.Post("/", middlewares.Protected(), controllers.CreateAccount)
	// route.Put("/", middlewares.Protected(), controllers.UpdateAccount)
	route.Post("/totals", controllers.GetTotalsByAccount)
}
