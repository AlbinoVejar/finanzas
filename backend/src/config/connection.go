package config

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Connection() *sql.DB {
	db, err := sql.Open("mysql", db_connection_localhost)
	if err != nil {
		db.Close()
		panic(err)
	}
	return db
}

func CloseConnection() {
}
