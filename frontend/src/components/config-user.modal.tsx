import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
} from '@chakra-ui/react'
import React from 'react'

type propsTypes = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfigUserModal = ({ open, setOpen }: propsTypes) => {
  const onClose = () => {
    setOpen(false)
  }
  const onSubmit = () => {}
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
        <ModalHeader>Configuración</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="flex-start">
            <Box width='100%'>
              <FormControl isReadOnly>
                <FormLabel>Nombres</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box width='100%'>
              <FormControl isReadOnly>
                <FormLabel>Apellidos</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box width='100%'>
              <FormControl isReadOnly>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormControl>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter alignContent="space-between">
          <Box>
            <Button colorScheme="red">Cerrar Sesión</Button>
          </Box>
          <Box>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={onSubmit}>
              Guardar
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfigUserModal
