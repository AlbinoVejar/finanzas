import { useQuery } from '@tanstack/react-query'
import {
  GetAccounts,
  GetOneAccounts,
} from '../services/accounts.service'

const useAccounts = () => {
  const getAccounts = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetAccounts(filters),
      enabled: Boolean(filters),
      select(data) {
        return data.data
      },
    })
  const getAccount = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetOneAccounts(filters),
      enabled: Boolean(filters),
      select(data) {
        return data.data
      },
    })

  return { getAccounts, getAccount }
}

export default useAccounts
