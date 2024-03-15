package models

type Expense struct {
	Id          int
	Description string
	Amount      float32
}

type NewExpense struct {
	Description     string
	Amount          float32
	Id_rel_Category int
	Id_rel_Account  int
}

type ResumeExpense struct {
	Id int
	Id_expense int
	Amont float32
	Description string
	Id_account int
	Account string
	Credit bool
	Id_category int
	Category string
}
