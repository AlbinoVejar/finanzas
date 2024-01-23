package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
)

func RoutesExpenses(app *fiber.App) {
	route := app.Group("/expenses")

	// route.Put("/:id", middlewares.Protected(), controllers.UpdateExpense)
	route.Put("/:id", controllers.UpdateExpense)
}
