import { Button, FormControl, FormLabel, HStack, IconButton, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { TableHeaders, TableHeadersID } from './headers'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'
import useExpenses from '../../hooks/useExpenses.hook'
import TableAction from './tableAction'
import DeleteDialog from '../../components/delete.dialog'
import { useRef } from 'react'
import { CategoryStateType } from '../../types/category.type'
import { CategorySelector } from '../../context/categoryState'
import { Expense } from '../../types/expense.type'
import { ModalState } from '../../context/modalState'
import { ModalTypeState } from '../../types/modal.type'
import useToastComponent from '../../components/toast.component'

const TableAllExpenses = () => {
  const { details, filters, refetches } = useRecoilValue<UserStateType>(UserSelector);
  const [modalState, setModalState] = useRecoilState<ModalTypeState<Expense>>(ModalState);
  const { items } = useRecoilValue<CategoryStateType>(CategorySelector);
  const { GetAllExpenses, deleteExpense } = useExpenses();
  const { data, refetch } = GetAllExpenses(details.Id_rel_Account, filters)
  const useToast = useToastComponent();
  
  const cancelRef = useRef();
  const onDeleteExpense = async () => {
    if(modalState.details){
      const {data: responseDelete} = await deleteExpense.mutateAsync(modalState.details);
      if(responseDelete){
        setModalState({...modalState, deleteExpense: false, details: null});
        refetch();
        refetches.detailsAccount();
        useToast({ status: 'success', title: 'Exito', description: 'Gastó se eliminó con exito' });
      }
    }
  }
  return (
    <>
      <VStack spacing={4} align='flex-start'>
        <HStack spacing={4} margin={4} align='end' justify='stretch'>
          <FormControl>
            <FormLabel>Categorias</FormLabel>
            <Select placeholder='Categoría'>
              {!!items && items.map(item => (
                <option value={String(item.Id)}>{item.Name}</option>
              ))}
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Fecha</FormLabel>
            <SelectDates />
          </FormControl>
          <FormControl>
            <Button width='100%' colorScheme='blue'>Buscar</Button>
          </FormControl>
          <IconButton aria-label='Search database' icon={<RiTable2 />} />
          <IconButton aria-label='Search database' icon={<RiLayoutGridFill />} />
        </HStack>
        <TableContainer width="100%" maxHeight={'80vh'} overflowY={'auto'}>
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
                !!data &&
                data.length > 0 && (
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