import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  StackDivider,
  Stat,
  StatLabel,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiSettings2Line, RiSettings3Line } from '@remixicon/react';
import { FormatCurreny } from '../../utils';
import { Account, TotalWasteAccount } from '../../types/account.type';
import ConfigAccountModal from '../../components/config-account.modal';
import { useState } from 'react';
import useAccounts from '../../hooks/useAccounts.hook';
import { useRecoilValue } from 'recoil';
import { UserStateType } from '../../types/user.type';
import { UserSelector } from '../../context/userState';
import Quicktable from '../../components/quicktable';
import { TableActionType } from '../../types/table.type';

type propsTypes = {
  accounts: TotalWasteAccount[];
};

const AccountsDashboard = ({ accounts }: propsTypes) => {
  const navigate = useNavigate();
  const { filters } = useRecoilValue<UserStateType>(UserSelector);
  const [openConfig, setOpenConfig] = useState(false);
  const [accountSelected, setAccountSelected] = useState<Account | null>(null);
  const { getAccounts, updateAccount } = useAccounts();
  const { refetch } = getAccounts(filters);
  const { mutateAsync } = updateAccount;
  const onOpenDetails = (row: any): void => {
    navigate(`cuenta/${row.Id_Account}`);
  };
  const onOpenConfig = (row: any) => {
    setAccountSelected({
      Id: row.Id_Account,
      Name: row.Account,
      Credit: row.Credit,
      Limit_amount: row.Limit_amount
    })
    setOpenConfig(true);
  };

  const onEditAccount = async (values: Account) => {
    await mutateAsync(values);
    refetch();
    setAccountSelected(null);
    setOpenConfig(false);
  };

  const actions: TableActionType[] = [
    {
      id: 'edit',
      handler: onOpenDetails,
      icon: <RiEyeLine />,
      label: 'Ver Detalles',
    },
    {
      id: 'delete',
      handler: onOpenConfig,
      icon: <RiSettings2Line />,
      label: 'Configuración',
    },
  ];

  return (
    <>
      <Card width="100%">
        <CardHeader>
          <Heading>Mis cuentas</Heading>
        </CardHeader>
        <CardBody>
          <Quicktable
            headers={[
              { id: 'Account', label: 'Nombre', empty: '-' },
              { id: 'Credit', label: '¿Credito?', empty: '-' },
              { id: 'Limit_amount', label: 'Limite', empty: '-' },
              { id: 'Total', label: 'Gastado', empty: '-' },
              { id: 'Actions', label: 'Acciones', empty: '-' },
            ]}
            data={accounts.map((item: any) => ({ ...item, Actions: actions }))}
            keyTable="accountsDashboard"
            config={{ showMenuAction: false }}
          />
        </CardBody>
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
