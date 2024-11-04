import { Button, VStack } from '@chakra-ui/react'
import { RiAddFill, RiArrowGoBackFill, RiToolsFill } from '@remixicon/react'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ActionsAccount = () => {
  const navigate = useNavigate()
  const refresh = useRecoilRefresher_UNSTABLE(ModalState)
  const [openModal, setOpenModal] =
    useRecoilState<ModalTypeState<any>>(ModalState)
  const onOpenExpenseModal = () => {
    setOpenModal({ ...openModal, expense: true, details: null })
  }
  const onOpenConfiguration = () => {
    setOpenModal({ ...openModal, globalConfiguration: true })
  }
  const onGoToBack = () => {
    navigate('/')
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>
      <VStack spacing={4} justify="center" align="strech" paddingBottom={4}>
        <Button
          colorScheme="blue"
          leftIcon={<RiAddFill />}
          onClick={onOpenExpenseModal}
        >
          Agregar Gasto
        </Button>
        <Button
          colorScheme="gray"
          leftIcon={<RiToolsFill />}
          onClick={onOpenConfiguration}
        >
          Configuración
        </Button>
        <Button
          variant="outline"
          leftIcon={<RiArrowGoBackFill />}
          onClick={onGoToBack}
        >
          Mis Cuentas
        </Button>
      </VStack>
    </>
  )
}

export default ActionsAccount
