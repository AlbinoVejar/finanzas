import { Divider, useMediaQuery, VStack } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { UserStateType } from '../../types/user.type';
import { UserState } from '../../context/userState';
import useExpenses from '../../hooks/useExpenses.hook';
import DeleteDialog from '../../components/delete.dialog';
import { useRef } from 'react';
import { Expense, ExpenseDetails } from '../../types/expense.type';
import { ModalState } from '../../context/modalState';
import { ModalTypeState } from '../../types/modal.type';
import useToastComponent from '../../components/toast.component';
import ListTable from '../../components/listTable';
import Quicktable from '../../components/quicktable';
import ExpenseModal from '../../components/expense.modal';
import FilterExpenses from './filterExpenses';
import { TableActionType } from '../../types/table.type';
import { RiDeleteBin2Fill, RiEditFill } from '@remixicon/react';

const TableAllExpenses = () => {
  const [isMobileDevice] = useMediaQuery('(max-width: 62em)');
  const [userState] = useRecoilState<UserStateType>(UserState);
  const { details, filters, refetches } = userState;
  const [modalState, setModalState] =
    useRecoilState<ModalTypeState<Expense>>(ModalState);
  const { GetAllExpenses, deleteExpense } = useExpenses();
  const { data, refetch } = GetAllExpenses(details.Id_rel_Account, filters);
  const useToast = useToastComponent();
  const isDataExist: boolean = Boolean(data) && !!data && data?.length > 0;

  const cancelRef = useRef();
  const confirmDelete = async (item: ExpenseDetails) => {
    setModalState({ ...modalState, deleteExpense: true, details: item });
  };

  const onDeleteExpense = async () => {
    if (modalState.details) {
      const { data: responseDelete } = await deleteExpense.mutateAsync(
        modalState.details
      );
      if (responseDelete) {
        setModalState({ ...modalState, deleteExpense: false, details: null });
        refetch();
        refetches.detailsAccount();
        useToast({
          status: 'success',
          title: 'Exito',
          description: 'Gastó se eliminó con exito',
        });
      }
    }
  };

  const onUpdateExpense = async (item: ExpenseDetails) => {
    setModalState({ ...modalState, details: item, expense: true });
  };

  const actionListTable: any = {
    onEditHandler: onUpdateExpense,
    onDeleteHandler: onDeleteExpense,
  };

  const actions: TableActionType[] = [
    {
      id: 'update',
      label: 'Editar',
      icon: <RiEditFill />,
      handler: onUpdateExpense,
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: <RiDeleteBin2Fill />,
      handler: confirmDelete,
    },
  ];

  return (
    <>
      <VStack spacing={4} align="flex-start">
        <FilterExpenses isDataExist={isDataExist} />
        <Divider />
        {isMobileDevice ? (
          <ListTable expenses={data ?? []} actions={actionListTable} />
        ) : (
          <Quicktable
            headers={[
              { id: 'Account', label: 'Cuenta', empty: '-' },
              { id: 'Category', label: 'Categoría', empty: '-' },
              { id: 'Description', label: 'Descripción', empty: '-' },
              { id: 'Amount', label: 'Monto', empty: '-' },
              { id: 'Date_expense', label: 'Fecha', empty: '-' },
              { id: 'Actions', label: 'Acciones', empty: '-' },
            ]}
            data={
              data?.map((i: ExpenseDetails) => ({ ...i, Actions: actions })) ??
              []
            }
            keyTable="allExpensesDashboard"
            config={{ showMenuAction: false }}
          />
        )}
      </VStack>
      <DeleteDialog
        title="Eliminar Gasto"
        message="¿Estás seguro de eliminar Gasto?"
        htmlRef={cancelRef}
        onConfirm={onDeleteExpense}
      />
      <ExpenseModal />
    </>
  );
};

export default TableAllExpenses;
