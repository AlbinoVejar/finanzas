import {
  Stack
} from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { TotalWasteAccount } from '../../types/account.type'
import AccountsDashboard from './accounts'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'
import useAccounts from '../../hooks/useAccounts.hook'


const Dashboard = () => {
  const {filters} = useRecoilValue<UserStateType>(UserSelector)
  const {getAccounts} = useAccounts();
  const { isLoading, isError, error, data: accounts } = getAccounts(filters)

  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <Stack direction={['column', 'row']} spacing={6} justify="center" align="stretch" margin="1rem 1rem">
          {
            !!accounts &&
            accounts.length > 0 &&
            <AccountsDashboard key={`accounts_table_dashboard`} accounts={accounts} />
          }
        </Stack>
      )}
    </>
  )
}

export default Dashboard
