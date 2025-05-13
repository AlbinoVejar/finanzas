import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine } from '@remixicon/react';
import { FormatCurreny } from '../../utils';
import { Account, TotalWasteAccount } from '../../types/account.type';
import ConfigAccountModal from '../../components/config-account.modal';
import { useState } from 'react';
import useAccounts from '../../hooks/useAccounts.hook';
import { useRecoilValue } from 'recoil';
import { UserStateType } from '../../types/user.type';
import { UserSelector } from '../../context/userState';

type propsTypes = {
  account: TotalWasteAccount;
};

const AccountsDashboard = ({ account }: propsTypes) => {
  const navigate = useNavigate();
  const { filters } = useRecoilValue<UserStateType>(UserSelector);
  const [openConfig, setOpenConfig] = useState(false);
  const [accountSelected, setAccountSelected] = useState<Account | null>(null);
  const { getAccounts, updateAccount } = useAccounts();
  const { refetch } = getAccounts(filters);
  const { mutateAsync } = updateAccount;
  const onOpenDetails = (value: number | undefined): void => {
    navigate(`cuenta/${value}`);
  };

  const onEditAccount = async (values: Account) => {
    await mutateAsync(values);
    refetch();
    setAccountSelected(null);
    setOpenConfig(false);
  };

  return (
    <>
      <Card
        width="100%"
        rounded="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor={'gray.300'}>
        <CardHeader paddingY={2} paddingBottom={0} paddingX={2}>
          <Heading size="lg">{account.Account}</Heading>
        </CardHeader>
        <CardBody paddingY={1} paddingTop={0} paddingX={2}>
          <Flex direction="column" justifyContent="flex-start">
            <Text fontSize="lg">
              Total Usado: {FormatCurreny(account.Total)}
            </Text>
            <Text fontSize="lg">
              Limite: {FormatCurreny(account.Limit_amount)}
            </Text>
          </Flex>
        </CardBody>
        <CardFooter padding={2}>
          <Flex direction="column" w="100%" alignItems="center">
            <Button
              width="95%"
              leftIcon={<RiEyeLine />}
              borderColor={'gray.400'}
              variant="outline"
              onClick={() => onOpenDetails(account.Id_Account)}
              rounded="lg">
              Ver Detalles
            </Button>
          </Flex>
        </CardFooter>
      </Card>
      <ConfigAccountModal
        open={openConfig}
        setOpen={setOpenConfig}
        details={accountSelected}
        onHandlerSubmit={!!accountSelected && onEditAccount}
      />
    </>
  );
};

export default AccountsDashboard;
