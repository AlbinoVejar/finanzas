import { useMutation } from '@tanstack/react-query'
import { NewExpense } from '../types/expense.type'
import { CreateExpense, GetExpenseByAccount } from '../services/expenses.service'

const useExpenses = () => {
  const mutation = useMutation({
    mutationKey: ['create_expense'],
    mutationFn: async (value: NewExpense) => await CreateExpense(value),
  })
  const GetExpenseByAccountMutation = useMutation({
    mutationKey: ['totalWasteByAccount'],
    mutationFn: async (formData: any) => await GetExpenseByAccount(formData.filters,formData.id),
    onError(error) {
      throw error;
    },
  })
  return { mutation, GetExpenseByAccountMutation }
}

export default useExpenses
