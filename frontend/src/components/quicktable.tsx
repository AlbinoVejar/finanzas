import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { TableActionType, TableHeaderType } from '../types/table.type'
import { RiMenuFill } from '@remixicon/react'

type quickTableProps<T> = {
  headers: TableHeaderType[]
  data: T[]
  keyTable: string
}

const Quicktable = ({ headers, data, keyTable }: quickTableProps<any>) => {
  return (
    <TableContainer borderWidth="2px" borderRadius="lg">
      <Table size="sm" variant="striped">
        <Thead bg="gainsboro" textColor="black">
          <Tr>
            {!!headers &&
              headers.map((header: TableHeaderType) => (
                <Th key={`header_key_${header.id}`}>{header.label}</Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {!!data &&
            data.map((item: any, index: number) => (
              <Tr key={`table_row_${keyTable}_${index}`}>
                {headers.map(({ id, empty }: TableHeaderType) => (
                  <Td
                    textAlign={id === 'Actions' ? 'center' : 'start'}
                    key={`row_data_${id}`}
                  >
                    {id === 'Actions' ? (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Opciones"
                          icon={<RiMenuFill />}
                          variant="outline"
                        />
                        <MenuList>
                          {item[id] &&
                            item[id].map((action: TableActionType) => (
                              <MenuItem
                                key={`action_item_${action.id}_${id}_${item.id}`}
                                icon={action.icon}
                                onClick={() => action.handler(item)}
                              >
                                {action.label}
                              </MenuItem>
                            ))}
                        </MenuList>
                      </Menu>
                    ) : (
                      item[id] ?? empty
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Quicktable
