package models

type Account struct {
	Id           int
	Name         string
	Credit       bool
	Limit_amount float32
}

type AccountDashboard struct {
	Id           int
	Name         string
	Credit       bool
	Limit_amount float32
	Amount_used  float32
}

type AccountTotalRequest struct {
	Init_date string
	End_date  string
}

type AccountTotalResponse struct {
	Id_Account     int
	Id_rel_Account int
	Account        string
	Credit         bool
	Limit_amount   float32
	Total          float32
	Created_at     string
}
