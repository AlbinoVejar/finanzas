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
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { TableActionType, TableHeaderType } from '../types/table.type';
import { RiMenuFill } from '@remixicon/react';

type quickTableProps<T> = {
  headers: TableHeaderType[];
  data: T[];
  keyTable: string;
  config: {
    showMenuAction: boolean;
  };
};

const Quicktable = <T,>({
  headers,
  data,
  keyTable,
  config = {
    showMenuAction: true,
  },
}: quickTableProps<T>) => {
  const RenderActions = (item: T, id: string) => {
    return config.showMenuAction ? (
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
                onClick={() => action.handler(item)}>
                {action.label}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    ) : (
      <ButtonGroup spacing="2">
        {item[id] &&
          item[id].map((action: TableActionType) => (
            <IconButton
              key={`action_item_${action.id}_${id}_${item.id}`}
              aria-label={action.label}
              icon={action.icon}
              onClick={() => action.handler(item)}
            />
          ))}
      </ButtonGroup>
    );
  };

  const returnLabel = (value: any, empty: string) => {
    if (typeof value === 'boolean') {
      return Boolean(value) ? 'Si' : 'No';
    } else {
      return String(value ?? empty);
    }
  };

  return (
    <TableContainer borderWidth="2px" borderRadius="lg">
      <Table size="sm" variant="striped">
        <Thead bg="gainsboro" textColor="black">
          <Tr>
            {!!headers &&
              headers.map((header: TableHeaderType) => (
                <Th
                  key={`header_key_${header.id}`}
                  textAlign={header.id === 'Actions' ? 'center' : 'left'}>
                  {header.label}
                </Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {!!data &&
            data.map((item: T, index: number) => (
              <Tr key={`table_row_${keyTable}_${index}`}>
                {headers.map(({ id, empty }: TableHeaderType) => (
                  <Td
                    textAlign={id === 'Actions' ? 'center' : 'start'}
                    key={`row_data_${id}`}>
                    {id === 'Actions'
                      ? RenderActions(item, id)
                      : returnLabel(item[id], empty)}
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Quicktable;
