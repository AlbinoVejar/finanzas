import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Switch,
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

const ConfigAccountModal = ({ open, setOpen, details }: propsTypes) => {
  const setOpenDeleteDialog = useDisclosure();
  const cancelRef = React.useRef();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, defaultValues },
  } = useForm({
    defaultValues: {
      name: '',
    },
    // resolver: zodResolver(schemaExpense),
  });
  const onSubmit = () => {
    console.log('hello', true);
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <FormControl>
                  <FormLabel>¿Es Crédito?</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Switch size="md" {...field} />}
                  />
                  {renderErrorsText(
                    errors?.name?.message,
                    'No es obligatorio dejar una breve descripción.'
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Limite de Crédito</FormLabel>
                  <InputGroup>
                    <InputLeftAddon pointerEvents="none">$</InputLeftAddon>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          precision={2}
                          min={0}
                          defaultValue={0.0}
                          width="100%"
                          {...field}>
                          <NumberInputField borderLeftRadius={0} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    />
                  </InputGroup>
                  {renderErrorsText(
                    errors?.name?.message,
                    'No es obligatorio dejar una breve descripción.'
                  )}
                </FormControl>
              </VStack>
            </form>
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

export default ConfigAccountModal;
