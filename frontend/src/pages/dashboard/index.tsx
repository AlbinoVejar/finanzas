import {
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { TableState } from '../../context/tableState'
import Categories from '../categories'
import { Category, ResumeCategory } from '../../types/category.type'
import useAccounts from '../../hooks/useAccounts.hook'
import useResume from '../../hooks/useResume.hook'
import { CategorySelector } from '../../context/categoryState'
import { ResumeExpense } from '../../types/expense.type'

const Dashboard = () => {
  useAccounts().query;
  const { isLoading, isError, data, error } = useResume().query
  const {data: categories, resume} = useRecoilValue<ResumeCategory>(CategorySelector);
  const getResumeByCategory = (id: number) => {
    if(resume.length > 0){
      const result = resume.filter((e: ResumeExpense) => e.Id_category === id);
      console.log("result", result)
      console.log("id", id)
      return result;
    }
    return []
  }
  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <HStack spacing={6} justify="center" margin="1rem 1rem">
          {categories.length > 0 && categories?.map((item: Category) => (
            <Categories key={item.Id} category={item} resume={getResumeByCategory(item.Id)}/>
          ))}
        </HStack>
      )}
    </>
  )
}

export default Dashboard
