import { useQuery } from '@tanstack/react-query'
import { GetAccounts, GetOneAccounts } from '../services/accounts.service'

const useAccounts = () => {
  const getAccounts = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetAccounts(filters),
      select(data) {
        return data.data
      },
    })
  const getAccount = (filters: any) =>
    useQuery({
      queryKey: ['get_accounts', filters],
      queryFn: async () => await GetOneAccounts(filters),
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

  return { getAccounts, getAccount }
}

export default useAccounts
