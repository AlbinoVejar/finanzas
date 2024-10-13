import Quicktable from '../../components/quicktable';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { RiAddFill, RiDeleteBin2Fill, RiEditFill } from '@remixicon/react';
import { TableActionType, TableHeaderType } from '../../types/table.type';
import { useRef } from 'react';
import DeleteDialog from '../../components/delete.dialog';

type propsTypes<T> = {
  title: string;
  data: T[];
  headers: TableHeaderType[];
  onCreate: any;
  onEdit: any;
  onDelete: any;
  setOpen: any;
};

const TablesSection = ({
  title,
  data,
  headers,
  onCreate,
  onEdit,
  onDelete,
  setOpen,
}: propsTypes<any>) => {
  const cancelRef = useRef();
  const onHandlerCreate = (row: any) => {
    onCreate(row);
  };
  const onHandlerEdit = (row: any) => {
    setOpen(true);
    onEdit(row);
  };
  const onHandlerDelete = (row: any) => {
    onDelete(row);
  };
  const actions: TableActionType[] = [
    {
      id: 'edit',
      handler: onHandlerEdit,
      icon: <RiEditFill />,
      label: 'Editar',
    },
    {
      id: 'delete',
      handler: onHandlerDelete,
      icon: <RiDeleteBin2Fill />,
      label: 'Eliminar',
    },
  ];

  return (
    <SimpleGrid columns={1} spacing={8}>
      <Card>
        <CardHeader>
          <Stack direction="column" gap={4}>
            <Heading size="md">{title}s</Heading>
            <Box w='30%'>
            <Button
              leftIcon={<RiAddFill />}
              variant="outline"
              onClick={onHandlerCreate}>
              Agregar {title}
            </Button>
            </Box>
          </Stack>
        </CardHeader>
        <Divider />
        <CardBody>
          {data && (
            <Quicktable
              data={data.map((item) => ({ ...item, Actions: actions }))}
              headers={headers}
              keyTable="categories"
              config={{ showMenuAction: false }}
            />
          )}
        </CardBody>
      </Card>
      <DeleteDialog
        title={`Eliminar ${title}`}
        message={`¿Estás seguro de eliminar ${title}?`}
        htmlRef={cancelRef}
        onConfirm={onHandlerDelete}
      />
    </SimpleGrid>
  );
};

export default TablesSection;
