package routes

import (
	"github.com/gofiber/fiber/v2"
)

func AllRoutes(app *fiber.App) {
	RoutesAccounts(app)
	RoutesCategories(app)
	RoutesExpenses(app)
	RoutesUser(app)
}
