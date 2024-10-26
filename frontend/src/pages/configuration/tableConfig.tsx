import Quicktable from '../../components/quicktable';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiAddFill, RiDeleteBin2Fill, RiEditFill } from '@remixicon/react';
import { TableActionType, TableHeaderType } from '../../types/table.type';
import { useRef } from 'react';

type propsTypes<T> = {
  title: string;
  data: T[];
  headers: TableHeaderType[];
  onDelete: any;
  setOpen: any;
  setSelected: any;
};

const TablesSection = ({
  title,
  data,
  headers,
  onDelete,
  setOpen,
  setSelected,
}: propsTypes<any>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef: any = useRef();
  const removeActions = (row: any) => {
    const values = { ...row };
    delete values.Actions;
    return values;
  };
  const onOpenCreateModal = () => {
    setSelected(null);
    setOpen(true);
  }
  const onHandlerEdit = (row: any) => {
    setSelected(removeActions(row));
    setOpen(true);
  };
  const onHandlerDelete = (row: any) => {
    setSelected(removeActions(row));
    onOpen();
  };
  const onSubmitDelete = async () => {
    await onDelete();
    onClose();
  }
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
    <>
      <SimpleGrid columns={1} spacing={8}>
        <Card>
          <CardHeader>
            <Stack direction="column" gap={4}>
              <Heading size="md">{title}s</Heading>
              <Box w="30%">
                <Button
                  leftIcon={<RiAddFill />}
                  variant="outline"
                  onClick={onOpenCreateModal}>
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
      </SimpleGrid>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Eliminar ${title}`}
            </AlertDialogHeader>
            <AlertDialogBody>{`¿Estás seguro de eliminar ${title}?`}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onSubmitDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TablesSection;
