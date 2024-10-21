import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../types/modal.type'
import { ModalState } from '../context/modalState'
import { Expense } from '../types/expense.type'

type propsTypes = {
  title: string;
  message: string;
  onConfirm: any;
  htmlRef: any;
}

const DeleteDialog = ({ message, title, onConfirm, htmlRef }: propsTypes) => {  
  const [modalState, setModalState] = useRecoilState<ModalTypeState<Expense>>(ModalState);
  
  const onSubmit = () => {
    onConfirm();
  }

  const onClose = () => {
    setModalState({...modalState, deleteExpense: false});
  }

  return (
    <AlertDialog
    motionPreset='slideInBottom'
      isOpen={modalState.deleteExpense}
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
