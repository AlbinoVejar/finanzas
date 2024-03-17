import { useQuery } from '@tanstack/react-query'
import { Resume, ResumeData } from '../types/expense.type'
import { GetResume } from '../services/expenses.service'
import { ResponseAPI } from '../types/response.type'
import { useRecoilValue } from 'recoil'
import { UserSelector } from '../context/userState'
import { UserStateType } from '../types/user.type'
import { useEffect } from 'react'

const useResume = () => {
  const { accountSelected } = useRecoilValue<UserStateType>(UserSelector)
  const query = useQuery({
    queryKey: ['getResume'],
    queryFn: async () => await GetResume({ Id: accountSelected ?? 1 }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data: ResponseAPI<ResumeData>) {
      const { data: values, status } = data
      if (status !== 200) {
        return []
      } else {
        return values
      }
    },
  })
  useEffect(() => {
    if(query.isSuccess){
      setAccounts(query.data);
    }  
  }, [query.data, setAccounts]);
  return { query }
}

export default useResume
