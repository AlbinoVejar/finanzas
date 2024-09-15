import { useMutation, useQuery } from '@tanstack/react-query'
import { NewExpense } from '../types/expense.type'
import { CreateExpense, GetExpenseByAccount } from '../services/expenses.service'

const useExpenses = () => {
  const mutation = useMutation({
    mutationKey: ['create_expense'],
    mutationFn: async (value: NewExpense) => await CreateExpense(value),
  })
  const getAllExpenses = (id: number, filters: any) =>
    useQuery({
      queryKey: ['get_expenses_account', id],
      queryFn: async () => await GetExpenseByAccount({...filters, id}),
      enabled: id > 0,
      select(data) {
        return data.data
      },
    })
  return { mutation, getAllExpenses }
}

export default useExpenses
