import { Box, Button, FormControl, FormLabel, HStack, IconButton, Select, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React from 'react'
import { TableHeaders, TableHeadersID } from './headers'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'
import { useGetTotalsQuery } from '../../services/accounts.service'
import { AccountStateType } from '../../types/account.type'
import { AccountSelector } from '../../context/accountState'
import { useRecoilValue } from 'recoil'
import TableAction from './tableAction'

const TableAllExpenses = () => {
  const {id, filters} = useRecoilValue<AccountStateType>(AccountSelector)
  const query = useGetTotalsQuery(Number(id), {Id_User: 1, Init_date: filters.init_date, End_date: filters.end_date})
  return (
    <>
      <VStack spacing={4} align='flex-start'>
        <HStack spacing={4} margin={4} align='end' justify='stretch'>
          <FormControl>
            <FormLabel>Categorias</FormLabel>
            <Select placeholder='Categoría'>
              <option>United Arab Emirates</option>
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
        <TableContainer width="100%">
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
                !!query.data &&
                query.data.length > 0 && (
                  query.data.map((row: any, index: number) => (
                    <Tr key={`tr_row_${index}`}>
                      {
                        TableHeadersID.map((value: string) => {
                            if (value === "Acciones"){
                              return <Td key={`td_row_actions_${index}`}>
                                <TableAction row={row}/>
                              </Td>
                            } else {
                              return <Td key={`td_row_${value}_${index}`}>{value === '#' ? index+1 : row[value]}</Td>
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
    </>
  )
}

export default TableAllExpenses