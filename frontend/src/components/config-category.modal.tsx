import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { renderErrorsText } from '../utils/tools';
import { RiDeleteBin7Line } from '@remixicon/react';
import DeleteDialog from './delete.dialog';

type propsTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: any;
};

const ConfigCategoryModal = ({ open, setOpen, details }: propsTypes) => {
  const setOpenDeleteDialog = useDisclosure();
  const cancelRef = React.useRef();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, defaultValues },
  } = useForm({
    defaultValues: {
      name: '',
    },
    // resolver: zodResolver(schemaExpense),
  });

  const onCofirmDelete = () => {
    console.log('hello', true);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        isCentered
        blockScrollOnMount
        closeOnOverlayClick={false}
        size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurar Categoría</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" resize="none" {...field} />
                  )}
                />
                {renderErrorsText(
                  errors?.name?.message,
                  'No es obligatorio dejar una breve descripción.'
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex gap={2} width="100%">
              <Button
                leftIcon={<RiDeleteBin7Line />}
                variant="outline"
                colorScheme="red"
                onClick={() => setOpenDeleteDialog.onOpen()}>
                Eliminar
              </Button>
              <Spacer />
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="solid" colorScheme="blue" type="submit">
                Agregar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <DeleteDialog
        setOpen={setOpenDeleteDialog}
        htmlRef={cancelRef}
        title="Eliminar Categoría"
        message="¿Estas seguro que desea eliminar esta categoría?"
        onConfirm={onCofirmDelete}
      /> */}
    </>
  );
};

export default ConfigCategoryModal;
