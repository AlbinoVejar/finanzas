package config

import "os"

var SECRET_KEY = os.Getenv("SECRET_KEY")

const db_connection_localhost = "%s:%s@tcp(%s:%s)/%s"
const db_connection_prod = "%s:%s@tcp(%s:%s)/%s"
