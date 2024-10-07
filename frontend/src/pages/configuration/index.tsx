import {
  Button,
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
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
// import TablesSection from './tableConfig'

const GlobalConfiguration = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState)
  const { globalConfiguration } = open
  return (
    <>
      <Modal
        isOpen={globalConfiguration}
        isCentered
        onClose={() => {
          setOpen({ ...open, globalConfiguration: false })
        }}
        closeOnEsc
        blockScrollOnMount
        closeOnOverlayClick={false}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configuración</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TablesSection />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline">Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GlobalConfiguration
