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
	Id          int
	Id_expense  int
	Amount      float32
	Description string
	Id_account  int
	Account     string
	Credit      bool
	Id_category int
	Category    string
	Created_at  string
}

type ExpenseByAccount struct {
	Id              int
	Id_rel_Expense  int
	Category        string
	Amount          float32
	Description     string
	Id_rel_Category int
	Created_at      string
}
