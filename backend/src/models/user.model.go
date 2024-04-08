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

type UserDashboard struct {
	Id         int
	Id_account int
	Init_date  string
	End_date   string
}
