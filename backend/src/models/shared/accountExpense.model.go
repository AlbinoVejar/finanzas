package shared

import "gitlab.com/AlbinoVejar/finanzas/backend/src/models"

type AccountExpensesResponse struct {
	Accounts []models.AccountTotalResponse
	Expenses []models.ExpenseDetails
	Total    float32
}
