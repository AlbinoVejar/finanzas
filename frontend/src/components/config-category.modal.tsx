import {
  Button,
  ButtonGroup,
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
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { renderErrorsText } from '../utils/tools';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type propsTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: any | null;
  onHandlerSubmit: any;
};

const schemaExpense = z.object({
  name: z.string().min(4, 'Ingresa un nombre valido.').trim(),
});

const ConfigCategoryModal = ({
  open,
  setOpen,
  details,
  onHandlerSubmit,
}: propsTypes) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schemaExpense),
  });

  const onSubmit = (values: any) => {
    if (isValid) {
      onHandlerSubmit(values);
    }
  };

  useEffect(() => {
    if (!!details) {
      reset({
        name: details.Name ?? '',
      });
    }else{
      reset({name: ''});
    }
  }, [details]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {!!details ? 'Configurar' : 'Agregar'} Categoría
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={2}>
                <FormControl isInvalid={Boolean(errors?.name)}>
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
                    'Es obligatorio escribir un nombre.'
                  )}
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Flex
                gap={2}
                direction="row"
                width="100%"
                justifyContent="flex-end">
                <ButtonGroup>
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="solid" colorScheme="blue" type="submit">
                    Agregar
                  </Button>
                </ButtonGroup>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfigCategoryModal;
