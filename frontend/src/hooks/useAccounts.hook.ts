import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CreateAccount,
  DeleteAccount,
  GetAccounts,
  GetItemsAccounts,
  GetOneAccounts,
  UpdateAccount,
} from '../services/accounts.service';

const useAccounts = () => {
  const getAllItemsAccounts = () =>
    useQuery({
      queryKey: ['get_items_accounts'],
      queryFn: async () => await GetItemsAccounts(),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data;
      },
    });
  const getAccounts = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetAccounts(filters),
      enabled: Boolean(filters),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data;
      },
    });
  const getAccount = (filters: any) =>
    useQuery({
      queryKey: ['get_account', filters],
      queryFn: async () => await GetOneAccounts(filters),
      enabled: Boolean(filters),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data;
      },
    });
  const createAccount = useMutation({
    mutationKey: ['create_Account'],
    mutationFn: async (values: any) => await CreateAccount(values),
    onError(error) {
      throw error;
    },
  });
  const updateAccount = useMutation({
    mutationKey: ['update_Account'],
    mutationFn: async (values: any) => await UpdateAccount(values),
    onError(error) {
      throw error;
    },
  });
  const deleteAccount = useMutation({
    mutationKey: ['delete_Account'],
    mutationFn: async (Id: number) => await DeleteAccount(Id),
    onError(error) {
      throw error;
    },
  });

  return {
    getAllItemsAccounts,
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
  };
};

export default useAccounts;
