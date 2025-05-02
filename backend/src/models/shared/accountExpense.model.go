package shared

import "gitlab.com/AlbinoVejar/finanzas/backend/src/models"

type AccountExpensesResponse struct {
	Accounts []models.AccountTotalResponse
	Expenses []models.ExpenseByAccount
	Total    float32
}
