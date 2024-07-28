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

type TotalCategoryRequest struct {
	Id_account int
}

type TotalCategory struct {
	Id              int
	Id_rel_Expense  int
	Category        string
	Total           float32
	Id_Category     int
	Id_rel_Category int
	Created_at      string
}
