package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
)

func RoutesExpenses(app *fiber.App) {
	route := app.Group("/expenses")

	// route.Put("/:id", middlewares.Protected(), controllers.UpdateExpense)
	route.Put("/:id", controllers.UpdateExpense)
	// route.Put("/", middlewares.Protected(), controllers.CreateExpense)
	route.Post("/", controllers.CreateExpense)
	// route.Get("/", middlewares.Protected(), controllers.CreateExpense)
	route.Post("/ByAccount/:id", controllers.GetExpensesByAccount)
}
