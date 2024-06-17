import { Box, Button, FormControl, FormLabel, HStack, IconButton, Select, Spacer, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React from 'react'
import { TableHeaders } from './headers'
import SelectDates from '../../components/selectDates'
import { RiLayoutGridFill, RiTable2 } from '@remixicon/react'

const TableAllExpenses = () => {
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
            <Tbody></Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  )
}

export default TableAllExpenses