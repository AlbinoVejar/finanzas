import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { TotalWasteAccount } from '../../types/account.type';
import AccountsDashboard from './accounts';
import { UserStateType } from '../../types/user.type';
import { UserSelector } from '../../context/userState';
import useAccounts from '../../hooks/useAccounts.hook';
import ExpenseDashboard from './expenses';

const Dashboard = () => {
  const { filters } = useRecoilValue<UserStateType>(UserSelector);
  const { getAccounts } = useAccounts();
  const { isLoading, isError, error, data: accounts } = getAccounts(filters);

  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <Stack
          direction={['row', 'column']}
          spacing={12}
          justify="start"
          align="center"
          margin="1rem 1rem"
          height='100%'>
          <SimpleGrid columns={4} spacing={6} maxHeight='30vh' overflowY='auto' paddingY='2%'>
            {!!accounts &&
              accounts.length > 0 &&
              accounts.map((item: TotalWasteAccount) => (
                <AccountsDashboard
                  key={`account_${item.Id_Account}`}
                  account={item}
                />
              ))}
          </SimpleGrid>
          <ExpenseDashboard />
        </Stack>
      )}
    </>
  );
};

export default Dashboard;
