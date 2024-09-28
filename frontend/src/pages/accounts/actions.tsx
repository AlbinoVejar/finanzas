import { Button, VStack } from '@chakra-ui/react'
import { RiAddFill, RiArrowGoBackFill, RiToolsFill } from '@remixicon/react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
import { useNavigate } from 'react-router-dom'

const ActionsAccount = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useRecoilState<ModalTypeState>(ModalState);
  const onOpenExpenseModal = () => {
    setOpenModal({ ...openModal, expense: true });
  }
  const onOpenConfiguration = () => {
    setOpenModal({ ...openModal, globalConfiguration: true });
  }
  const onGoToBack = () => {
    navigate('/');
  }
  return (
    <>
      <VStack spacing={4} justify='center' align='strech'>
        <Button colorScheme='blue' leftIcon={<RiAddFill />} onClick={onOpenExpenseModal}>Agregar Gasto</Button>
        <Button colorScheme='gray' leftIcon={<RiToolsFill />} onClick={onOpenConfiguration}>Configuración</Button>
        <Button variant='outline' leftIcon={<RiArrowGoBackFill />} onClick={onGoToBack}>Mis Cuentas</Button>
      </VStack>
    </>
  )
}

export default ActionsAccount