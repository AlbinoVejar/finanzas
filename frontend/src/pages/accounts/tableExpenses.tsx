import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, IconButton, Select, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { TableHeaders, TableHeadersID } from './headers'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'
import { useRecoilState } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserState } from '../../context/userState'
import useExpenses from '../../hooks/useExpenses.hook'
import TableAction from './tableAction'
import DeleteDialog from '../../components/delete.dialog'
import { useEffect, useRef } from 'react'
import { Expense } from '../../types/expense.type'
import { ModalState } from '../../context/modalState'
import { ModalTypeState } from '../../types/modal.type'
import useToastComponent from '../../components/toast.component'
import useCategories from '../../hooks/useCategories.hook'

const TableAllExpenses = () => {
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

  useEffect(() => {
    if (Array.isArray(itemsCategories) && itemsCategories.length > 0) {
      setUserState({ ...userState, items: { ...userState.items, categories: itemsCategories } })
    }
  }, [itemsCategories]);

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
        <TableContainer width="100%" maxHeight='80vh' overflowY='auto' padding={2}>
          <Table variant='striped'>
            <Thead>
              <Tr>
                {TableHeaders.map((value: string, index: number) => (
                  <Th key={`header_row_${index}_${value}`}>{value}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {
                isDataExist ? (
                  data.map((row: any, index: number) => (
                    <Tr key={`tr_row_${index}`}>
                      {
                        TableHeadersID.map((value: string) => {
                          if (value === "Acciones") {
                            return <Td key={`td_row_actions_${index}`}>
                              <TableAction row={row} />
                            </Td>
                          } else {
                            return <Td key={`td_row_${value}_${index}`}>{value === '#' ? index + 1 : row[value]}</Td>
                          }
                        })
                      }

                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={TableHeadersID.length}>Sin datos</Td>
                  </Tr>
                )
              }
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <DeleteDialog title='Eliminar Gasto' message='¿Estás seguro de eliminar Gasto?' htmlRef={cancelRef} onConfirm={onDeleteExpense} />
    </>
  )
}

export default TableAllExpenses