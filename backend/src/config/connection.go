package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Connection() (*gorm.DB, func()) {
	if db != nil {
		return db, func() {}
	}
	godotenv.Load(".env")
	env := os.Getenv("APP_ENV")
	var stringConnection string
	if env == "production" {
		stringConnection = db_connection_prod
	} else {
		stringConnection = db_connection_localhost
	}
	db_connection := fmt.Sprintf(stringConnection,
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"))
	db, err := gorm.Open(mysql.Open(db_connection), &gorm.Config{})
	dbClose, _ := db.DB()
	if err != nil {
		fmt.Println(db_connection)
		panic(err)
	}
	fmt.Println("Connection Success")
	return db, func() {
		dbClose.Close()
	}
}
