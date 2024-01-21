package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func RoutesUser(app *fiber.App) {
	route := app.Group("/users")

	route.Get("/:id", middlewares.Protected(), controllers.GetUser)
	route.Post("/", controllers.CreateUser)
	route.Post("/login", controllers.Login)
}
