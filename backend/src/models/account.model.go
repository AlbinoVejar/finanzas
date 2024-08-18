package models

type Account struct {
	Id           int
	Name         string
	Credit       bool
	Limit_amount float32
}

type AccountTotalRequest struct {
	Init_date string
	End_date  string
}

type AccountTotalResponse struct {
	Id             int
	Account        string
	Total          float32
	Limit_amount   float32
	Id_rel_Account int
	Created_at     string
}
