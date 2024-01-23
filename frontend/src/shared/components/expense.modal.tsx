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
  InputLeftElement,
  IconButton,
  InputLeftAddon,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModalState } from '../../context/modalState'
import { CategorySelector } from '../../context/categoryState'
import { Category } from '../../types/category.type'
import { RiMoneyDollarCircleLine } from '@remixicon/react'

const ExpenseModal = () => {
  const [open, setOpen] = useRecoilState<boolean>(ModalState)
  const categories = useRecoilValue<Category[]>(CategorySelector)
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
        <ModalHeader>Agregar gasto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Select placeholder="Seleccione una categoría">
                {categories.map(({ Name, Id }: Category) => (
                  <option value={Id}>{Name}</option>
                ))}
              </Select>
              <FormHelperText>Seleccione la categoría.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Monto</FormLabel>
              <InputGroup>
                <InputLeftAddon pointerEvents="none">$</InputLeftAddon>
                <NumberInput precision={2} min={0} defaultValue={0.0} width="100%">
                  <NumberInputField borderLeftRadius={0}/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <FormHelperText>Escriba el monto del Gasto.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea size="xs" resize="none" />
              <FormHelperText>No es obligatorio dejar una breve descripción.</FormHelperText>
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
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => setOpen(false)}
            >
              Agregar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ExpenseModal
