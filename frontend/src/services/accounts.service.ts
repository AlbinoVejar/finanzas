import axios from 'axios'
import { url_localhost } from '../shared/enviroment'
import { ResponseAPI } from '../types/response.type'
import { Account } from '../types/account.type'
import { TotalCategory } from '../types/category.type'
import { UserDashboard } from '../types/user.type'
import { useQuery } from '@tanstack/react-query'
import { AccountState } from '../context/accountState'
import { useRecoilState } from 'recoil'
import { ExpenseByAccount } from '../types/expense.type'

const mainUrl: string = '/accounts'

const GetAccounts = async (filter: any): Promise<ResponseAPI<Account[]>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}?init=${filter.init_date}&end=${filter.end_date}`)
    return data
  } catch (error) {
    return { data: [], status: 404 }
  }
}

const CreateAccount = async (account: Account): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axios.post(`${url_localhost}${mainUrl}`, account)
    return data
  } catch (error) {
    return { data: null, status: 404 }
  }
}

const GetExpensesByAccount = async (
  id: number,
  filter: any
): Promise<ResponseAPI<ExpenseByAccount[]>> => {
  try {
    const { data } = await axios.post(`${url_localhost}/expenses/ByAccount/${id}`, filter)
    return data
  } catch (error) {
    return { data: [], status: 404 }
  }
}

export const useGetTotalsQuery = (id: number, filters: any) => {
  return useQuery({
    queryKey: ['get_expenses_account', id],
    queryFn: () => GetExpensesByAccount(id, filters),
    enabled: id > 0,
    select(data) {
      return data.data;
    },
  })
}

export const useGetAccounts = (filter: any) =>
  useQuery({
    queryKey: ['get_accounts'],
    queryFn: async () => await GetAccounts(filter),
    select(data) {
      return data.data
    },
  })