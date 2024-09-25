import { Button, VStack } from '@chakra-ui/react'
import { RiAddFill, RiArrowGoBackFill, RiToolsFill } from '@remixicon/react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'

const ActionsAccount = () => {
  const [openModal, setOpenModal] = useRecoilState<ModalTypeState>(ModalState);
  const onOpenExpenseModal = () => {
    setOpenModal({ ...openModal, expense: true });
  }
  return (
    <>
      <VStack spacing={4} justify='center' align='strech'>
        <Button colorScheme='blue' leftIcon={<RiAddFill />} onClick={onOpenExpenseModal}>Agregar Gasto</Button>
        <Button colorScheme='gray' leftIcon={<RiToolsFill />}>Configuración</Button>
        <Button variant='outline' leftIcon={<RiArrowGoBackFill />}>Mis Cuentas</Button>
      </VStack>
    </>
  )
}

export default ActionsAccount