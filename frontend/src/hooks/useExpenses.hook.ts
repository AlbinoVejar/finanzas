import { useMutation, useQuery } from '@tanstack/react-query'
import { Expense, NewExpense } from '../types/expense.type'
import {
  CreateExpense,
  DeleteExpense,
  GetExpenseByAccount,
} from '../services/expenses.service'

const useExpenses = () => {
  const NewExpense =
    useMutation({
      mutationKey: ['create_expense'],
      mutationFn: async (value: NewExpense) => await CreateExpense(value),
      onError(error) {
        throw error
      },
    })
  const GetAllExpenses = (id: number, filters: any) =>
    useQuery({
      queryKey: ['get_expenses_account', id],
      queryFn: async () => await GetExpenseByAccount({ ...filters, id }),
      enabled: id > 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data
      },
      throwOnError(error) {
        console.log("EEERRROROROR")
        throw error
      },
    })

  const deleteExpense = 
    useMutation({
      mutationKey: ["delete_expense"],
      mutationFn: async(value: Expense) => await DeleteExpense(value),
      onError(error) {
        throw error
      },
    })
  return { NewExpense, GetAllExpenses, deleteExpense }
}

export default useExpenses
