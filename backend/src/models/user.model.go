package models

type User struct {
	Id         int
	Name       string
	Email      string
	Password   string
	Created_At string
	Modified   string
	Deleted    string
}

type UserTotal struct {
	Id_User int
	Id_Account int
	Init_date string
	End_date string
}
