package models

type Category struct {
	Id   int
	Name string
}

type DetailCategory struct {
	Id           int
	Row_per_page int
	Page_number  int
}

type TotalCategory struct {
	Id_account      int
	Account_name    string
	Category        string
	Total           float32
	Amount          float32
	Id_rel_category int
	Id_rel_account  int
}
