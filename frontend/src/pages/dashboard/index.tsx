import {
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { Account, TotalWasteAccount } from '../../types/account.type'
import AccountsDashboard from './accounts'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'
import useAccounts from '../../hooks/useAccounts.hook'


const Dashboard = () => {
  const {filters} = useRecoilValue<UserStateType>(UserSelector)
  const {getAccounts} = useAccounts();
  const { isLoading, isError, error, data: accounts } = getAccounts(filters)
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
        <Stack direction={['row', 'column']} spacing={6} justify="center" align="stretch" margin="1rem 1rem" height="100vh">
          {
            !!accounts &&
            accounts.length > 0 &&
            accounts.map((item: TotalWasteAccount) => (
              <AccountsDashboard key={`account_${item.Id_Account}`} account={item} />
            ))
          }
        </Stack>
      )}
    </>
  )
}

export default Dashboard
