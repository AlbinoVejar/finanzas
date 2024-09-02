import {
  HStack,
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import {
  ResumeCategory,
  TotalCategory,
} from '../../types/category.type'
import useAccounts from '../../hooks/useAccounts.hook'
import { CategorySelector } from '../../context/categoryState'
import { ExpenseTable, ResumeExpense } from '../../types/expense.type'
import useResume from '../../hooks/useResume.hook'
import { RiDeleteBin5Line, RiEditLine } from '@remixicon/react'
import { AccountSelector } from '../../context/accountState'
import { Account, TotalWasteAccount } from '../../types/account.type'
import AccountsDashboard from './accounts'
import { useGetAccounts } from '../../services/accounts.service'
import dayjs from 'dayjs'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'


const Dashboard = () => {
  const {filters} = useRecoilValue<UserStateType>(UserSelector)
  
  const { isLoading, isError, error, data: accounts } = useGetAccounts(filters)
  // useAccounts().query
  // const { query, queryTotals } = useResume()
  // const { isLoading, isError, error } = query
  // const { data: totals } = queryTotals
  // const { data: categories, resume } =
  //   useRecoilValue<ResumeCategory>(CategorySelector)
  // const accounts = useRecoilValue<Account[]>(AccountSelector)
  // const getResumeByCategory = (id: number): ExpenseTable[] => {
  //   if (resume.length > 0) {
  //     const result = resume.filter((e: ResumeExpense) => e.Id_category === id)
  //     return result.map((e: ExpenseTable) => ({
  //       ...e,
  //       Actions: [
  //         {
  //           id: 'quickEdit',
  //           label: 'Editar',
  //           icon: <RiEditLine />,
  //           handler: (e: ExpenseTable) => onQuickEditExpense(e.Id),
  //         },
  //         {
  //           id: 'quickDelete',
  //           label: 'Eliminar',
  //           icon: <RiDeleteBin5Line />,
  //           handler: (e: ExpenseTable) => onQuickDeleteExpense(e.Id),
  //         },
  //       ],
  //     }))
  //   }
  //   return []
  // }
  // const getTotalByCategory = (id: number) => {
  //   if (totals && totals?.length > 0) {
  //     return totals?.find((e: TotalCategory) => e.Id_category === id)
  //   }
  //   return undefined
  // }
  // const onQuickEditExpense = (id: number) => {
  //   console.log('edit', 'Hola', id)
  // }
  // const onQuickDeleteExpense = (id: number) => {
  //   console.log('delete', 'Hola', id)
  // }
  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <HStack spacing={6} justify="center" align="stretch" margin="1rem 1rem">
          {
            !!accounts &&
            accounts.length > 0 &&
            accounts.map((item: TotalWasteAccount) => (
              <AccountsDashboard key={`account_${item.Id_rel_Account}`} account={item} />
            ))
          }
        </HStack>
      )}
    </>
  )
}

export default Dashboard
