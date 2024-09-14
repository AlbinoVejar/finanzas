import { Button, FormControl, FormLabel, HStack, IconButton, Select, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { TableHeaders } from './headers'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'
import { useRecoilValue } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'
import useExpenses from '../../hooks/useExpenses.hook'
import { useEffect } from 'react'

const TableAllExpenses = () => {
  const {details, filters} = useRecoilValue<UserStateType>(UserSelector);
  const {getAllExpenses} = useExpenses();
  const data = getAllExpenses(details.Id_rel_Account, filters)
  useEffect(() => {
    console.log('data', data)
  }, [data]);
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
              {/* {
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
              } */}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  )
}

export default TableAllExpenses