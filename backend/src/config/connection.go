package config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connection() *gorm.DB {
	db, err := gorm.Open(mysql.Open(db_connection_localhost), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}

func CloseConnection() {
}
