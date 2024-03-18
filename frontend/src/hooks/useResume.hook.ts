import { useQuery } from '@tanstack/react-query'
import { Resume, ResumeData, ResumeExpense } from '../types/expense.type'
import { GetResume } from '../services/expenses.service'
import { ResponseAPI } from '../types/response.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserSelector, UserState } from '../context/userState'
import { UserStateType } from '../types/user.type'
import { useEffect } from 'react'
import { CategoryState } from '../context/categoryState'
import { AccountState } from '../context/accountState'

const useResume = () => {
  const [, setCategories] = useRecoilState(CategoryState)
  const [, setAccounts] = useRecoilState(AccountState)
  const [, setUserState] = useRecoilState(UserState)
  const { accountSelected } = useRecoilValue<UserStateType>(UserSelector)
  const query = useQuery({
    queryKey: ['getResume'],
    queryFn: async () => await GetResume({ Id: 1 }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data: ResponseAPI<ResumeData>) {
      const { data: values, status } = data
      if (status !== 200) {
        return null
      } else {
        return values
      }
    },
  })
  useEffect(() => {
    if (query.isSuccess && !!query.data) {
      const { accounts, categories, expenses } = query?.data
      setAccounts(accounts)
      setUserState({accountSelected: accounts[0].Id ?? 0})
      setCategories({ data: categories, resume: expenses })
    }
  }, [query.data, setAccounts, setCategories])
  return { query }
}

export default useResume
