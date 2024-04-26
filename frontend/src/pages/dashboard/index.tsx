import { HStack } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import Categories from '../categories'
import { Category, ResumeCategory, TotalCategory } from '../../types/category.type'
import useAccounts from '../../hooks/useAccounts.hook'
import { CategorySelector } from '../../context/categoryState'
import { ResumeExpense } from '../../types/expense.type'
import useResume from '../../hooks/useResume.hook'

const Dashboard = () => {
  useAccounts().query
  const { query, queryTotals } = useResume();
  const {isLoading, isError, error} = query;
  const { data: totals } = queryTotals;
  const { data: categories, resume } =
    useRecoilValue<ResumeCategory>(CategorySelector)
    
  const getResumeByCategory = (id: number) => {
    if (resume.length > 0) {
      const result = resume.filter((e: ResumeExpense) => e.Id_category === id)
      return result
    }
    return []
  }
  const getTotalByCategory = (id: number) => {
    if(totals && totals?.length > 0){
      return totals?.find((e: TotalCategory) => e.Id_category === id)
    }
    return undefined;
  }
  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <HStack spacing={6} justify="center" align="stretch" margin="1rem 1rem">
          {!!categories && categories.length > 0 &&
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

export default Dashboard
