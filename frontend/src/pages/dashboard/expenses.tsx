import { Button, Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';
import Quicktable from '../../components/quicktable';
import { ExpenseDetails } from '../../types/expense.type';
import { useRecoilState } from 'recoil';
import { ModalTypeState } from '../../types/modal.type';
import { ModalState } from '../../context/modalState';
import ExpenseModal from '../../components/expense.modal';
import { RiAddFill } from '@remixicon/react';

type propsTypes = {
  expenses: ExpenseDetails[];
  total: number;
};

const ExpenseDashboard = ({ expenses, total }: propsTypes) => {
  const [openModal, setOpenModal] = useRecoilState<ModalTypeState<any>>(ModalState)
  const onOpenExpenseModal = () => {
    setOpenModal({ ...openModal, expense: true, details: null })
  }
  // const actions: TableActionType[] = [
  //   {
  //     id: 'edit',
  //     handler: () => { },
  //     icon: <RiEyeLine />,
  //     label: 'Ver Detalles',
  //   },
  //   {
  //     id: 'delete',
  //     handler: () => { },
  //     icon: <RiSettings2Line />,
  //     label: 'Configuración',
  //   },
  // ];

  return (
    <>
      <Card width='90%'>
        <CardHeader>
          <Flex justifyContent="space-between">
            <Heading>Mis gastos</Heading>
            <Button
              colorScheme="blue"
              leftIcon={<RiAddFill />}
              onClick={onOpenExpenseModal}
            >
              Agregar Gasto
            </Button>
          </Flex>
          <Heading>Gastos del día del hoy: {expenses.length} - Total Gastado: ${total}</Heading>
        </CardHeader>
        <CardBody>
          <Quicktable
            headers={[
              { id: 'Account', label: 'Cuenta', empty: '-' },
              { id: 'Category', label: 'Categoría', empty: '-' },
              { id: 'Description', label: 'Descripción', empty: '-' },
              { id: 'Amount', label: 'Monto', empty: '-' },
              { id: 'Date_expense', label: 'Fecha', empty: '-' },
            ]}
            data={expenses}
            keyTable="accountsDashboard"
            config={{ showMenuAction: false }}
          />
        </CardBody>
      </Card>

      <ExpenseModal />
    </>
  );
};

export default ExpenseDashboard;
