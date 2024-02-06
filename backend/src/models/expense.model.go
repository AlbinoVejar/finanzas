package models

type Expense struct {
	Id          int
	Description string
	Amount      float32
}

type NewExpense struct {
	Description string
	Amount      float32
	Id_Category int
}
