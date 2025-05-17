import { Button, Card, CardBody, CardHeader, Flex, Tag, Text, useMediaQuery } from '@chakra-ui/react';
import Quicktable from '../../components/quicktable';
import { ExpenseDetails } from '../../types/expense.type';
import { useRecoilState } from 'recoil';
import { ModalTypeState } from '../../types/modal.type';
import { ModalState } from '../../context/modalState';
import ExpenseModal from '../../components/expense.modal';
import { RiAddFill } from '@remixicon/react';
import dayjs from 'dayjs';
import ListTable from '../../components/listTable';

type propsTypes = {
  expenses: ExpenseDetails[];
  total: number;
};

const ExpenseDashboard = ({ expenses, total }: propsTypes) => {
  const [isMobileDevice] = useMediaQuery('(max-width: 62em)');
  const [openModal, setOpenModal] = useRecoilState<ModalTypeState<any>>(ModalState)
  const onOpenExpenseModal = () => {
    setOpenModal({ ...openModal, expense: true, details: null })
  }

  return (
    <>
      <Card width='100%' rounded='lg' boxShadow='lg' borderWidth={1} borderColor={'gray.300'}>
        <CardHeader paddingBottom='1%'>
          <Tag size='lg'>{dayjs().format('dddd D MMMM YYYY')}</Tag>
          <Flex direction={['column', 'row']} justifyContent={{ sm: 'flex-start', md: 'space-between' }} gap={2}>
            <Flex direction='column'>
              <Text fontSize='3xl'><strong>{expenses?.length ?? 0}</strong> Gastos hoy</Text>
              <Text fontSize='4xl'><strong>${total ?? 0}</strong> pesos</Text>
            </Flex>
            <Button
              colorScheme="blue"
              leftIcon={<RiAddFill />}
              onClick={onOpenExpenseModal}
            >
              Agregar Gasto
            </Button>
          </Flex>
        </CardHeader>
        <CardBody paddingTop='2%'>
          {
            isMobileDevice ? (
              <ListTable expenses={expenses} />
            ) : (
              <Quicktable
                headers={[
                  { id: 'Account', label: 'Cuenta', empty: '-' },
                  { id: 'Category', label: 'Categoría', empty: '-' },
                  { id: 'Description', label: 'Descripción', empty: '-' },
                  { id: 'Amount', label: 'Monto', empty: '-' },
                  { id: 'Date_expense', label: 'Fecha', empty: '-' },
                ]}
                data={expenses ?? []}
                keyTable="accountsDashboard"
                config={{ showMenuAction: false }}
              />
            )
          }
        </CardBody>
      </Card>

      <ExpenseModal />
    </>
  );
};

export default ExpenseDashboard;
