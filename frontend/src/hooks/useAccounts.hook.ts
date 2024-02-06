import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { CreateAccount, GetAccounts } from '../services/accounts.service';
import { ResponseAPI } from '../types/response.type';
import { Account } from '../types/account.type';
import { AccountState } from '../context/accountState';
import { useRecoilState } from 'recoil';

const useAccounts = () => {
  const [, setAccounts] = useRecoilState(AccountState);
  const query = useQuery({
    queryKey:["accounts"],
    queryFn: async () => await GetAccounts(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data: ResponseAPI<Account[]>) {
      const {data: values, status} = data;
      if(status !== 200){
        return [];
      }else{
        return values;
      }
    },
  });

  const mutation = useMutation({
    mutationKey: ["create_account"],
    mutationFn: async (value: Account) => await CreateAccount(value)
  });

  useEffect(() => {
    if(query.isSuccess){
      setAccounts(query.data);
    }  
  }, [query.data, setAccounts]);

  return {query, mutation}
}

export default useAccounts 