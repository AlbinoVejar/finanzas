import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import React from 'react';
import Quicktable from '../../components/quicktable';
import { useRecoilValue } from 'recoil';
import { UserStateType } from '../../types/user.type';
import { UserSelector } from '../../context/userState';
import useExpenses from '../../hooks/useExpenses.hook';
import { TableActionType } from '../../types/table.type';
import { RiEyeLine, RiSettings2Line } from '@remixicon/react';

const ExpenseDashboard = () => {
  const { filters } = useRecoilValue<UserStateType>(UserSelector);
  const { GetAllDashboardExpenses } = useExpenses();
  const {
    isLoading,
    isError,
    error,
    data: expenses,
  } = GetAllDashboardExpenses(filters);
  const actions: TableActionType[] = [
    {
      id: 'edit',
      handler: () => {},
      icon: <RiEyeLine />,
      label: 'Ver Detalles',
    },
    {
      id: 'delete',
      handler: () => {},
      icon: <RiSettings2Line />,
      label: 'Configuración',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Heading>Mis gastos</Heading>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <p>...</p>
        ) : isError ? (
          <span>Error:{error.message}</span>
        ) : (
          <Quicktable
            headers={[
              { id: 'Account', label: 'Nombre', empty: '-' },
              { id: 'Credit', label: '¿Credito?', empty: '-' },
              { id: 'Limit_amount', label: 'Limite', empty: '-' },
              { id: 'Total', label: 'Gastado', empty: '-' },
              { id: 'Actions', label: 'Acciones', empty: '-' },
            ]}
            data={expenses.map((item: any) => ({ ...item, Actions: actions }))}
            keyTable="accountsDashboard"
            config={{ showMenuAction: false }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default ExpenseDashboard;
