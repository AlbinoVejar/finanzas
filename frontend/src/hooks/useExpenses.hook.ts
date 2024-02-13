import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { NewExpense } from '../types/expense.type'
import { CreateExpense } from '../services/expenses.service'

const useExpenses = () => {
  const mutation = useMutation({
    mutationKey: ["create_expense"],
    mutationFn: async (value: NewExpense) => await CreateExpense(value)
  })
  return {mutation}
}

export default useExpenses