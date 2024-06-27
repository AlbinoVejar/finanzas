import axios from 'axios'
import { url_localhost } from '../shared/enviroment'
import { ResponseAPI } from '../types/response.type'
import { Account } from '../types/account.type'
import { TotalCategory } from '../types/category.type'
import { UserDashboard } from '../types/user.type'
import { useQuery } from '@tanstack/react-query'
import { AccountState } from '../context/accountState'
import { useRecoilState } from 'recoil'

const mainUrl: string = '/accounts'

const GetAccounts = async (): Promise<ResponseAPI<Account[]>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}`)
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

const GetTotalsByAccount = async (
  id: number
): Promise<ResponseAPI<TotalCategory[]>> => {
  try {
    const { data } = await axios.get(`${url_localhost}${mainUrl}/${id}`)
    return data
  } catch (error) {
    return { data: [], status: 404 }
  }
}

export const useGetTotalsQuery = (id: number) => {
  const [, setAccounts] = useRecoilState(AccountState)
  return useQuery({
    queryKey: ['get_totals_account', id],
    queryFn: () => GetTotalsByAccount(id),
    enabled: id > 0,
    
  })
}
