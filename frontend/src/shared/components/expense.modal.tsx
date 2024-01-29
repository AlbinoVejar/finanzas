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
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalState } from '../../context/modalState'
import { CategorySelector } from '../../context/categoryState'
import { Category } from '../../types/category.type'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface IExpenseInputs {
  category: string
  amount: number
  description: string
}

const schemaExpense = z.object({
  category: z.string(),
  amount: z.number().positive(),
  description: z.string()
})

const ExpenseModal = () => {
  const [open, setOpen] = useRecoilState<boolean>(ModalState)
  const categories = useRecoilValue<Category[]>(CategorySelector)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IExpenseInputs>({
    defaultValues: {
      category: '',
      amount: 0,
      description: '',
    },
    resolver: zodResolver()
  })
  const onSubmit: SubmitHandler<IExpenseInputs> = (data) => {
    console.log('hellow', data)
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
              <FormControl isRequired>
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

                <FormHelperText>Seleccione la categoría.</FormHelperText>
              </FormControl>
              <FormControl isRequired>
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
                <FormHelperText>Escriba el monto del Gasto.</FormHelperText>
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
                <FormHelperText>
                  No es obligatorio dejar una breve descripción.
                </FormHelperText>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
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
