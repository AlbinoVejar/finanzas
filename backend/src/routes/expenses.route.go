package routes

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/controllers"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/middlewares"
)

func RoutesExpenses(app *fiber.App) {
	route := app.Group("/expenses")

	route.Post("/", middlewares.Protected(), controllers.CreateExpense)
	route.Put("/:id", middlewares.Protected(), controllers.UpdateExpense)
	route.Get("/totals", middlewares.Protected(), controllers.GetExpensesByAccount)
	route.Delete("/:id", middlewares.Protected(), controllers.DeleteExpense)
}
