package models

type Expense struct {
	Id           int
	Description  string
	Amount       float32
	Date_expense string
}

type NewExpense struct {
	Description     string
	Amount          float32
	Id_rel_Category int
	Id_rel_Account  int
	Date_expense    string
}

type TotalExpenseRequest struct {
	Id_account int
}

type ExpenseByAccount struct {
	Id              int
	Id_rel_Expense  int
	Id_rel_Category int
	Category        string
	Id_rel_Account  int
	Account         string
	Amount          float32
	Description     string
	Date_expense    string
}

type ExpenseDetails struct {
	Id int
	Account string
	Category string
	Amount float32
	Description string
	Date_expense string
	Id_expense int
	Id_rel_account int
	Id_rel_category int
	Id_user int
}