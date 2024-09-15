import { ResponseAPI } from '../types/response.type'
import { Account, TotalWasteAccount } from '../types/account.type'
import axiosConfig from '../utils/axiosConfig'

const mainUrl: string = '/accounts'

export const GetItemsAccounts = async (): Promise<ResponseAPI<Account[]>> => {
  try {
    const { data } = await axiosConfig.get(`${mainUrl}/`)
    return data
  } catch (error) {
    return { data: [], status: 404 }
  }
}

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
