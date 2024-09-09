import { ResponseAPI } from '../types/response.type'
import { Account, TotalWasteAccount } from '../types/account.type'
import { useQuery } from '@tanstack/react-query'
import { ExpenseByAccount } from '../types/expense.type'
import axiosConfig from '../utils/axiosConfig'

const mainUrl: string = '/accounts'

export const GetAccounts = async (filter: any): Promise<ResponseAPI<TotalWasteAccount[]>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/totals?id_account=${filter.id_account ?? 0}&init=${filter.init_date}&end=${filter.end_date}`)
    return data
  } catch (error) {
    return { data: [], status: 404 }
  }
}
export const GetOneAccounts = async (filter: any): Promise<ResponseAPI<TotalWasteAccount | null>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/totals?id_account=${filter.id_account ?? 0}&init=${filter.init_date}&end=${filter.end_date}`)
    return data
  } catch (error) {
    return { data:  null, status: 404 }
  }
}

const CreateAccount = async (account: Account): Promise<ResponseAPI<any>> => {
  try {
    const { data } = await axiosConfig.post(`${mainUrl}`, account)
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
    const { data } = await axiosConfig.post(`/expenses/ByAccount/${id}`, filter)
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