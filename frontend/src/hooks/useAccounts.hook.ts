import { useQuery } from '@tanstack/react-query'
import {
  GetAccounts,
  GetItemsAccounts,
  GetOneAccounts,
} from '../services/accounts.service'

const useAccounts = () => {
  const getAllItemsAccounts = () =>
    useQuery({
      queryKey: ['get_items_accounts'],
      queryFn: async () => await GetItemsAccounts(),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data
      },
    })
  const getAccounts = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetAccounts(filters),
      enabled: Boolean(filters),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data
      },
    })
  const getAccount = (filters: any) =>
    useQuery({
      queryKey: ['get_account', filters],
      queryFn: async () => await GetOneAccounts(filters),
      enabled: Boolean(filters),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data
      },
    })

  return { getAllItemsAccounts, getAccounts, getAccount }
}

export default useAccounts
