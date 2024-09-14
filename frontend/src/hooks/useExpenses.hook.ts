import { useMutation } from '@tanstack/react-query'
import { NewExpense } from '../types/expense.type'
import { CreateExpense, GetExpenseByAccount } from '../services/expenses.service'

const useExpenses = () => {
  const mutation = useMutation({
    mutationKey: ['create_expense'],
    mutationFn: async (value: NewExpense) => await CreateExpense(value),
  })
  const getAllExpenses = (id: number, filters: any) =>
    useMutation({
      mutationKey: ['get_expenses_account', id],
      mutationFn: async () => await GetExpenseByAccount({...filters, id}),
    })
  return { mutation, getAllExpenses }
}

export default useExpenses
