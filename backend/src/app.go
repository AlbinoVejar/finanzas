package src

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/routes"
)

func getPort() string {
	port := os.Getenv("PORT")

	if port == "" {
		port = ":3000"
	} else {
		port = ":" + port
	}
	return port
}

func InitServer() {
	app := fiber.New(fiber.Config{
		Network: "tcp6",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	app.Use(logger.New())

	routes.AllRoutes(app)

	log.Fatal(app.Listen(getPort()))
}
