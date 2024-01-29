import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import React from 'react'
import { TableSelector } from '../../context/tableState'
import { TableHeaderType, TableType } from '../../types/table.type'
import { useRecoilValue } from 'recoil'

const Quicktable = () => {
  const { headers, data } = useRecoilValue<TableType>(TableSelector)
  return (
    <TableContainer borderWidth="2px" borderRadius="lg">
      <Table size="sm" variant="striped">
        <Thead bg="gainsboro" textColor="black">
          <Tr>
            {headers.map((header: TableHeaderType) => (
              <Th key={`header_key_${header.id}`}>{header.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item: any, index: number) => (
            <Tr key={`table_row_${item.index}`}>
              {headers.map(({ id, empty }: TableHeaderType) => (
                <Td key={`row_data_${id}`}>{item[id] ?? empty}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Quicktable
