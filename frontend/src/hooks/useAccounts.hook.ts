import { useQuery } from '@tanstack/react-query'
import {
  GetAccounts,
  GetExpensesByAccount,
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

  const getTotalsQuery = (id: number, filters: any) =>
    useQuery({
      queryKey: ['get_expenses_account', id],
      queryFn: async () => await GetExpensesByAccount(id, filters),
      enabled: id > 0,
      select(data) {
        return data.data
      },
    })

  // const [, setAccounts] = useRecoilState(AccountState);
  // const query = useQuery({
  //   queryKey:["accounts"],
  //   queryFn: async () => await GetAccounts(),
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: false,
  //   select(data: ResponseAPI<Account[]>) {
  //     const {data: values, status} = data;
  //     if(status !== 200){
  //       return [];
  //     }else{
  //       return values;
  //     }
  //   },
  // });

  // const mutation = useMutation({
  //   mutationKey: ["create_account"],
  //   mutationFn: async (value: Account) => await CreateAccount(value)
  // });

  // useEffect(() => {
  //   if(query.isSuccess){
  //     setAccounts(query.data);
  //   }
  // }, [query.data, setAccounts]);

  return { getAccounts, getAccount, getTotalsQuery }
}

export default useAccounts
