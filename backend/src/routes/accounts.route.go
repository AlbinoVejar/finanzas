package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func RoutesAccounts(app *fiber.App) {
	route := app.Group("/accounts")

	route.Get("/", controllers.GetAccounts)
	route.Post("/", controllers.CreateAccount)
	route.Put("/", controllers.UpdateAccount)
	route.Get("/protected/", middlewares.Protected(), controllers.GetAccounts)
	route.Post("/protected/", middlewares.Protected(), controllers.CreateAccount)
	route.Put("/protected/", middlewares.Protected(), controllers.UpdateAccount)
}
