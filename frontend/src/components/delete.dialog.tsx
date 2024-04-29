import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  UseDisclosureProps,
} from '@chakra-ui/react'
import React from 'react'

type propsTypes = {
  setOpen: UseDisclosureProps
  title: string
  message: string
  htmlRef: any
  onConfirm: any
}

const DeleteDialog = ({ setOpen, htmlRef, message, title, onConfirm }: propsTypes) => {
  const { isOpen, onClose } = setOpen

  const onSubmit = () => {
    if(onClose){
      onClose()
    }
    onConfirm();
  }

  return (
    <AlertDialog
    motionPreset='slideInBottom'
      isOpen={isOpen}
      leastDestructiveRef={htmlRef}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>
            {message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={htmlRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onSubmit} ml={3}>
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteDialog
