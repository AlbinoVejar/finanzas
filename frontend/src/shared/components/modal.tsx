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
  Select,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { ModalState } from '../../context/modalState'

const ModalExample = () => {
  const [open, setOpen] = useRecoilState<boolean>(ModalState)
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
              <Select placeholder="Select categoria">
                <option>Example 1</option>
                <option>Example 2</option>
              </Select>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Select placeholder="Select categoria">
                <option>Example 1</option>
                <option>Example 2</option>
              </Select>
              <FormHelperText>We'll never share your email.</FormHelperText>
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

export default ModalExample
