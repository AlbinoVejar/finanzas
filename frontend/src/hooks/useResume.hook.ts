import { useQuery } from '@tanstack/react-query'
import { ResumeData } from '../types/expense.type'
import { GetResume } from '../services/expenses.service'
import { ResponseAPI } from '../types/response.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserSelector, UserState } from '../context/userState'
import { UserStateType } from '../types/user.type'
import { useEffect } from 'react'
import { CategoryState } from '../context/categoryState'
import { AccountState } from '../context/accountState'
import { GetTotalsByAccount } from '../services/accounts.service'
import { TotalCategory } from '../types/category.type'

const useResume = () => {
  const [, setCategories] = useRecoilState(CategoryState)
  const [, setAccounts] = useRecoilState(AccountState)
  const [userState, setUserState] = useRecoilState(UserState)
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
  const queryTotals = useQuery({
    queryKey: ['getTotalsByAccount'],
    queryFn: async () => await GetTotalsByAccount({Id_User: 1, Id_Account: accountSelected, Init_Date: '2024-03-01', End_Date: '2024-03-31'}),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: accountSelected > 0,
    select(data: ResponseAPI<TotalCategory[]>) {
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
      setUserState({
        ...userState,
        accountSelected: accounts[0].Id ?? 0,
      })
      setCategories({ data: categories, resume: expenses })
    }
  }, [query.data, setAccounts, setCategories])
  return { query, queryTotals }
}

export default useResume
