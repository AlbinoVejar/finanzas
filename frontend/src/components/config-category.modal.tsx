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
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { renderErrorsText } from '../utils/tools'
import { RiDeleteBin7Line } from '@remixicon/react'

type propsTypes = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfigCategoryModal = ({ open, setOpen }: propsTypes) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, defaultValues },
  } = useForm({
    defaultValues: {
      name: ''
    },
    // resolver: zodResolver(schemaExpense),
  })
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
            <Button leftIcon={<RiDeleteBin7Line />} variant="outline" colorScheme='red'>Eliminar</Button>
            <Spacer />
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
      </ModalContent>
    </Modal>
  )
}

export default ConfigCategoryModal
