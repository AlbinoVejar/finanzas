
const useAccounts = () => {
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

  // return {query, mutation}
}

export default useAccounts 