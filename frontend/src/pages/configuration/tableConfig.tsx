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
import DeleteDialog from '../../components/delete.dialog';
import { ModalState } from '../../context/modalState';
import { ModalTypeState } from '../../types/modal.type';
import { useRecoilState } from 'recoil';
import { useRef } from 'react';

type propsTypes<T> = {
  title: string;
  data: T[];
  headers: TableHeaderType[];
  onCreate: any;
  onEdit: any;
  onDelete: any;
  setOpen: any;
  setSelected: any;
};

const TablesSection = ({
  title,
  data,
  headers,
  onCreate,
  onEdit,
  onDelete,
  setOpen,
  setSelected,
}: propsTypes<any>) => {
  const [openModal, setOpenModal] =
    useRecoilState<ModalTypeState<any>>(ModalState);
  const cancelRef = useRef();
  const onHandlerCreate = (row: any) => {
    onCreate(row);
  };
  const removeActions = (row: any) => {
    const values = { ...row };
    delete values.Actions;
    return values;
  };
  const onHandlerEdit = (row: any) => {
    setSelected(removeActions(row));
    setOpen(true);
    onEdit(row);
  };
  const onHandlerDelete = (row: any) => {
    onDelete(removeActions(row));
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
      handler: setOpenModal({ ...openModal, deleteExpense: true }),
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
            <Box w="30%">
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
