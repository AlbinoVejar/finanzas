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
  const { accountSelected, Init_date, End_date, idUser } = useRecoilValue<UserStateType>(UserSelector)

  const query = useQuery({
    queryKey: ['getResume'],
    queryFn: async () => await GetResume({ Id: idUser }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: idUser > 0,
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
    queryFn: async () => await GetTotalsByAccount({Id: idUser, Id_account: accountSelected, Init_date: Init_date, End_date: End_date}),
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
