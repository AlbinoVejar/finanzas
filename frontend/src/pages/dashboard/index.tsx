import { Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { TotalWasteAccount } from '../../types/account.type';
import AccountsDashboard from './accounts';
import { UserStateType } from '../../types/user.type';
import { UserSelector } from '../../context/userState';
import ExpenseDashboard from './expenses';
import useExpenses from '../../hooks/useExpenses.hook';

const Dashboard = () => {
  const { filters } = useRecoilValue<UserStateType>(UserSelector);
  const { GetAllDashboardExpenses } = useExpenses();
  const { isLoading, isError, error, data } = GetAllDashboardExpenses(filters);
  const { Accounts, Expenses, Total } = data ?? {};

  return (
    <>
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <Stack
          direction="column"
          spacing={2}
          justify="start"
          align="center"
          height="100%">
          <Flex
            direction={['column', 'row']}
            gap={3}
            maxHeight="30vh"
            maxWidth="95vw"
            overflow="auto"
            paddingY="2%"
            justifyContent='stretch'
            width='90%'
            >
            {!!Accounts &&
              Accounts.length > 0 &&
              Accounts.map((item: TotalWasteAccount) => (
                <AccountsDashboard
                  key={`account_${item.Id_Account}`}
                  account={item}
                />
              ))}
          </Flex>
          <ExpenseDashboard expenses={Expenses} total={Total} />
        </Stack>
      )}
    </>
  );
};

export default Dashboard;
