package shared

import "gitlab.com/AlbinoVejar/finanzas/backend/src/models"

type AccountExpensesResponse struct {
	Accounts []models.AccountDashboard
	Expenses []models.ExpenseByAccount
	Total    float32
}
