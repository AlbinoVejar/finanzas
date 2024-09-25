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
import { ModalState } from '../context/modalState'
import { Category } from '../types/category.type'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { NewExpense } from '../types/expense.type'
import useExpenses from '../hooks/useExpenses.hook'
import { Account } from '../types/account.type'
import { UserSelector, UserState } from '../context/userState'
import { UserStateType } from '../types/user.type'
import { useEffect } from 'react'
import useAccounts from '../hooks/useAccounts.hook'
import { ModalTypeState } from '../types/modal.type'
import useCategories from '../hooks/useCategories.hook'
import useToastComponent from './toast.component'
import dayjs from 'dayjs'

interface IExpenseInputs {
  account: string
  category: string
  amount: number
  description: string
}

const schemaExpense = z.object({
  account: z.coerce.number().positive('Debe seleccionar una cuenta'),
  category: z.coerce.number().positive('Debe seleccionar una categoría'),
  amount: z.coerce.number().positive(),
  description: z.string().optional(),
})

const ExpenseModal = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState>(ModalState)
  const { expense } = open
  const [{ filters, details, refetches }, setUserState] = useRecoilState<UserStateType>(UserState);
  const { detailsAccount: getDetailsAccount } = refetches;
  const { getAllItemsAccounts } = useAccounts()
  const { data: itemsAccounts } = getAllItemsAccounts()
  const { data: itemsCategories } = useCategories().GetItemsCategories()
  const { NewExpense, GetAllExpenses } = useExpenses();
  const { refetch: refecthAllExpenses } = GetAllExpenses(details.Id_rel_Account, filters);
  const useToast = useToastComponent();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, defaultValues },
    reset,
  } = useForm<IExpenseInputs>({
    defaultValues: {
      account: '',
      category: '',
      amount: 0,
      description: '',
    },
    resolver: zodResolver(schemaExpense),
  })

  useEffect(() => {
    if (details) {
      reset({ ...defaultValues, account: String(details.Id_rel_Account) })
    }
  }, [details])

  const onSubmit: SubmitHandler<IExpenseInputs> = async (
    data: IExpenseInputs
  ) => {
    try {
      if (isValid) {
        const newCategory: NewExpense = {
          Amount: data.amount,
          Id_rel_Category: Number(data.category),
          Description: data.description,
          Id_rel_Account: Number(data.account),
          Date_expense: dayjs().format("YYYY-MM-DD")
        }
        await NewExpense.mutateAsync(
          newCategory
        )
        reset();
        refecthAllExpenses();
        getDetailsAccount();
        useToast({ status: 'success', title: 'Exito', description: 'Gastó agregado con exito' });
      }
    } catch (error) {
      useToast({ status: 'error', title: 'Error', description: 'Ocurrió un error' });
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
      isOpen={expense}
      onClose={() => setOpen({ ...open, expense: false })}
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
              <FormControl isInvalid={Boolean(errors?.account)}>
                <FormLabel>Cuenta</FormLabel>
                <Controller
                  name="account"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Seleccione una cuenta" {...field}>
                      {itemsAccounts?.map(({ Name, Id }: Account) => (
                        <option
                          key={`option_value_account_${Id}`}
                          value={String(Id)}
                        >
                          {Name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {renderErrorsText(
                  errors?.account?.message,
                  'Seleccione una cuenta.'
                )}
              </FormControl>
              <FormControl isInvalid={Boolean(errors?.category)}>
                <FormLabel>Categoria</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Seleccione una categoría" {...field}>
                      {itemsCategories?.map(({ Name, Id }: Category) => (
                        <option
                          key={`option_value_category_${Id}`}
                          value={String(Id)}
                        >
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
                onClick={() => setOpen({ ...open, expense: false })}
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
