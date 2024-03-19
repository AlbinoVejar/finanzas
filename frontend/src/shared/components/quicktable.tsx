import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { TableHeaderType } from '../../types/table.type'

type quickTableProps<T> = {
  headers: TableHeaderType[];
  data: T[];
  keyTable: string;
}

const Quicktable = ({
  headers,
  data,
  keyTable
}: quickTableProps<any>) => {
  // const { headers, data } = useRecoilValue<TableType>(TableSelector)
  return (
    <TableContainer borderWidth="2px" borderRadius="lg">
      <Table size="sm" variant="striped">
        <Thead bg="gainsboro" textColor="black">
          <Tr>
            {!!headers && headers.map((header: TableHeaderType) => (
              <Th key={`header_key_${header.id}`}>{header.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {!!data && data.map((item: any, index: number) => (
            <Tr key={`table_row_${keyTable}_${index}`}>
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
