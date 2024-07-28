package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func RoutesAccounts(app *fiber.App) {
	route := app.Group("/accounts")

	route.Get("/", middlewares.Protected(), controllers.GetAccounts)
	route.Post("/", middlewares.Protected(), controllers.CreateAccount)
	route.Put("/", middlewares.Protected(), controllers.UpdateAccount)
	route.Get("/totals", middlewares.Protected(), controllers.GetTotalsAccounts)
}
