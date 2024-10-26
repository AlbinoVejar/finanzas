import {
  Button,
  ButtonGroup,
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
  Switch,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { renderErrorsText } from '../utils/tools';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface propsTypes {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: any | null;
  onHandlerSubmit: any;
}

interface fieldTypes {
  name: string;
  limit_amount: number;
  credit: boolean;
}

const schemaExpense = z.object({
  name: z.coerce.string().min(4, 'Ingresa un nombre valido.').trim(),
  limit_amount: z.coerce
    .number()
    .min(1, 'Ingresa un monto mayor a 1')
    .positive(),
  credit: z.coerce.boolean().optional(),
});

const ConfigAccountModal = ({
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
  } = useForm<fieldTypes>({
    defaultValues: {
      name: '',
      limit_amount: 0,
      credit: false,
    },
    resolver: zodResolver(schemaExpense),
  });
  const onSubmit = (values: any) => {
    if (isValid) {
      let valuesSubmit = values;
      if (details) {
        valuesSubmit = { ...values, Id: details.Id };
      }
      onHandlerSubmit(valuesSubmit);
    }
  };

  useEffect(() => {
    if (!!details) {
      reset({
        name: details.Name ?? '',
        credit: details.Credit,
        limit_amount: Number(details.Limit_amount),
      });
    } else {
      reset({ name: '', credit: false, limit_amount: 0 });
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
              {!!details ? 'Configurar' : 'Agregar'} Cuenta
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
                    'No es obligatorio dejar una breve descripción.'
                  )}
                </FormControl>
                <FormControl isInvalid={Boolean(errors?.credit)}>
                  <FormLabel htmlFor="is_credit">¿Es Crédito?</FormLabel>
                  <Controller
                    name="credit"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        isChecked={field.value}
                        id="is_credit"
                        size="md"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
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
                      name="limit_amount"
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

export default ConfigAccountModal;
