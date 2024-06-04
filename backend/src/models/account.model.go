package models

type Account struct {
	Id     int
	Name   string
	Credit bool
}

type AccountTotalRequest struct {
	IdUser    int
	Init_date string
	End_date  string
}

type AccountTotalResponse struct {
	Id_Account     int
	Name           string
	Total          float32
	Id_rel_Account int
	Created_at     string
}
