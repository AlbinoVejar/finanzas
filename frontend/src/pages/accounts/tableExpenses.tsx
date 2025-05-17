import { Button, ButtonGroup, Divider, FormControl, FormLabel, IconButton, Select, Stack, useMediaQuery, VStack } from '@chakra-ui/react'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'
import { useRecoilState } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserState } from '../../context/userState'
import useExpenses from '../../hooks/useExpenses.hook'
import DeleteDialog from '../../components/delete.dialog'
import { useEffect, useRef } from 'react'
import { Expense, ExpenseDetails } from '../../types/expense.type'
import { ModalState } from '../../context/modalState'
import { ModalTypeState } from '../../types/modal.type'
import useToastComponent from '../../components/toast.component'
import useCategories from '../../hooks/useCategories.hook'
import ListTable from '../../components/listTable'
import Quicktable from '../../components/quicktable'
import ExpenseModal from '../../components/expense.modal'

const TableAllExpenses = () => {
  const [isMobileDevice] = useMediaQuery('(max-width: 62em)');
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const { details, filters, refetches } = userState;
  const { data: itemsCategories } = useCategories().GetItemsCategories()
  const [modalState, setModalState] = useRecoilState<ModalTypeState<Expense>>(ModalState);
  const { GetAllExpenses, deleteExpense } = useExpenses();
  const { data, refetch } = GetAllExpenses(details.Id_rel_Account, filters)
  const useToast = useToastComponent();
  const isDataExist: boolean = Boolean(data) && data.length > 0;

  const cancelRef = useRef();
  const onDeleteExpense = async () => {
    if (modalState.details) {
      const { data: responseDelete } = await deleteExpense.mutateAsync(modalState.details);
      if (responseDelete) {
        setModalState({ ...modalState, deleteExpense: false, details: null });
        refetch();
        refetches.detailsAccount();
        useToast({ status: 'success', title: 'Exito', description: 'Gastó se eliminó con exito' });
      }
    }
  }

  const onUpdateExpense = async (item: ExpenseDetails) => {
    setModalState({...modalState, details: item, expense: true})
  }

  useEffect(() => {
    if (Array.isArray(itemsCategories) && itemsCategories.length > 0) {
      setUserState({ ...userState, items: { ...userState.items, categories: itemsCategories } })
    }
  }, [itemsCategories]);

  const actionListTable: any = {
    onEditHandler: onUpdateExpense,
    onDeleteHandler: onDeleteExpense
  }

  return (
    <>
      <VStack spacing={4} align='flex-start'>
        <Stack direction={['column', 'row']} spacing={4} padding={4} align='end' justify='stretch' width="100%">
          <FormControl isDisabled={!isDataExist}>
            <FormLabel>Categorias</FormLabel>
            <Select placeholder='Categoría'>
              {!!itemsCategories && itemsCategories.map(item => (
                <option key={`category_table_expenses_${item.Id}`} value={String(item.Id)}>{item.Name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isDisabled={!isDataExist}>
            <FormLabel>Fecha</FormLabel>
            <SelectDates />
          </FormControl>
          <FormControl>
            <Button width='100%' colorScheme='blue' isDisabled={!isDataExist}>Buscar</Button>
          </FormControl>
          <ButtonGroup width='100%' justifyContent='flex-start' isDisabled={!isDataExist}>
            <IconButton aria-label='Search database' icon={<RiTable2 />} />
            <IconButton aria-label='Search database' icon={<RiLayoutGridFill />} />
          </ButtonGroup>
        </Stack>
        <Divider />
        {
          isMobileDevice ? (
            <ListTable expenses={data} actions={actionListTable} />
          ) : (
            <Quicktable
              headers={[
                { id: '#', label: 'Cuenta', empty: '-' },
                { id: 'Category', label: 'Categoría', empty: '-' },
                { id: 'Description', label: 'Descripción', empty: '-' },
                { id: 'Amount', label: 'Monto', empty: '-' },
                { id: 'Date_expense', label: 'Fecha', empty: '-' },
                { id: 'Actions', label: 'Acciones', empty: '-' }
              ]}
              data={data ?? []}
              keyTable="allExpensesDashboard"
              config={{ showMenuAction: false }}
            />
          )
        }
      </VStack>
      <DeleteDialog title='Eliminar Gasto' message='¿Estás seguro de eliminar Gasto?' htmlRef={cancelRef} onConfirm={onDeleteExpense} />
      <ExpenseModal />
    </>
  )
}

export default TableAllExpenses