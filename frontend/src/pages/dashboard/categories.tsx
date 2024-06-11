import React from 'react'
import { useRecoilValue } from 'recoil'
import { Category, ResumeCategory, TotalCategory } from '../../types/category.type'
import { CategorySelector } from '../../context/categoryState'
import useResume from '../../hooks/useResume.hook'
import { HStack } from '@chakra-ui/react'
import Categories from '../categories'
import { ExpenseTable, ResumeExpense } from '../../types/expense.type'
import { RiDeleteBin5Line, RiEditLine } from '@remixicon/react'

const CategoriesDashboard = () => {
  const { query, queryTotals } = useResume();
  const { isLoading, isError, error } = query
  const { data: totals } = queryTotals
  const { data: categories, resume } =
    useRecoilValue<ResumeCategory>(CategorySelector)
  const onQuickEditExpense = (id: number) => {
    console.log('edit', 'Hola', id)
  }
  const onQuickDeleteExpense = (id: number) => {
    console.log('delete', 'Hola', id)
  }
  const getResumeByCategory = (id: number): ExpenseTable[] => {
    if (resume! && resume.length > 0) {
      const result = resume.filter((e: ResumeExpense) => e.Id_category === id)
      return result.map((e: ExpenseTable) => ({
        ...e,
        Actions: [
          {
            id: 'quickEdit',
            label: 'Editar',
            icon: <RiEditLine />,
            handler: (e: ExpenseTable) => onQuickEditExpense(e.Id),
          },
          {
            id: 'quickDelete',
            label: 'Eliminar',
            icon: <RiDeleteBin5Line />,
            handler: (e: ExpenseTable) => onQuickDeleteExpense(e.Id),
          },
        ],
      }))
    }
    return []
  }
  const getTotalByCategory = (id: number) => {
    if (totals && totals?.length > 0) {
      return totals?.find((e: TotalCategory) => e.Id_category === id)
    }
    return undefined
  }
  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <HStack spacing={6} justify="center" align="stretch" margin="1rem 1rem">
          {!!categories &&
            categories.length > 0 &&
            categories?.map((item: Category) => (
              <Categories
                key={item.Id}
                category={item}
                total={getTotalByCategory(item.Id)}
                resume={getResumeByCategory(item.Id)}
              />
            ))}
        </HStack>
      )}
    </>
  )
}

export default CategoriesDashboard