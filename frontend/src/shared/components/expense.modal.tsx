import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
  Select,
  VStack,
  InputGroup,
  InputLeftAddon,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalState } from '../../context/modalState'
import { CategorySelector } from '../../context/categoryState'
import { Category } from '../../types/category.type'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Expense } from '../../types/expense.type'
import useExpenses from '../../hooks/useExpenses.hook'

interface IExpenseInputs {
  account: string;
  category: string;
  amount: number;
  description: string;
}

const schemaExpense = z.object({
  account: z.coerce.number().positive('Debe seleccionar una cuenta'),
  category: z.coerce.number().positive('Debe seleccionar una categoría'),
  amount: z.coerce.number().positive(),
  description: z.string().optional(),
})

const ExpenseModal = () => {
  const [open, setOpen] = useRecoilState<boolean>(ModalState)
  const categories = useRecoilValue<Category[]>(CategorySelector)
  const CreateExpense = useExpenses().mutation
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IExpenseInputs>({
    defaultValues: {
      category: '',
      amount: 0,
      description: '',
    },
    resolver: zodResolver(schemaExpense),
  })
  const onSubmit: SubmitHandler<IExpenseInputs> = async (
    data: IExpenseInputs
  ) => {
    if (isValid) {
      const newCategory: Expense = {
        Amount: data.amount,
        Id_Category: data.category,
        Description: data.description,
      }
      const { data: response, status } = await CreateExpense.mutateAsync(
        newCategory
      )
      if (status !== 404) {
        console.log('data', response)
      }
    }
  }

  const renderErrorsText = (
    errorMessage: string | undefined,
    helpText: string
  ) => {
    if (Boolean(errorMessage)) {
      return <FormErrorMessage>{errorMessage}</FormErrorMessage>
    } else {
      return <FormHelperText>{helpText}</FormHelperText>
    }
  }

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      isCentered
      blockScrollOnMount
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Agregar gasto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl isInvalid={Boolean(errors?.category)}>
                <FormLabel>Categoria</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Seleccione una categoría" {...field}>
                      {categories.map(({ Name, Id }: Category) => (
                        <option key={`option_value_${Id}`} value={Id}>
                          {Name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {renderErrorsText(
                  errors?.category?.message,
                  'Seleccione la categoría.'
                )}
              </FormControl>
              <FormControl isInvalid={Boolean(errors?.category)}>
                <FormLabel>Categoria</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Seleccione una categoría" {...field}>
                      {categories.map(({ Name, Id }: Category) => (
                        <option key={`option_value_${Id}`} value={Id}>
                          {Name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {renderErrorsText(
                  errors?.category?.message,
                  'Seleccione la categoría.'
                )}
              </FormControl>
              <FormControl isInvalid={Boolean(errors?.amount)}>
                <FormLabel>Monto</FormLabel>
                <InputGroup>
                  <InputLeftAddon pointerEvents="none">$</InputLeftAddon>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        precision={2}
                        min={0}
                        defaultValue={0.0}
                        width="100%"
                        {...field}
                      >
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
                  errors?.amount?.message,
                  'Escriba el monto del Gasto.'
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea size="xs" resize="none" {...field} />
                  )}
                />
                {renderErrorsText(
                  errors?.description?.message,
                  'No es obligatorio dejar una breve descripción.'
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex></Flex>
            <Flex gap={2}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="solid" colorScheme="blue" type="submit">
                Agregar
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ExpenseModal
