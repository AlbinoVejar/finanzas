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
	Id              int
	Name            string
	Id_rel_Category int
	Amount          float32
}
