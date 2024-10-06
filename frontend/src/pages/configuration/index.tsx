import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
import TablesSection from './tablesSection'

const GlobalConfiguration = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState);
  const {globalConfiguration} = open;
  return (
  <>
  <Modal 
  isOpen={globalConfiguration}
  isCentered
  onClose={() => {
    setOpen({...open, globalConfiguration: false});
  }}
  closeOnEsc
  blockScrollOnMount
  closeOnOverlayClick={false}
  size='xl'
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Configuración</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <TablesSection />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button variant='outline'>Cerrar</Button>
          <Button colorScheme='blue'>Guardar</Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  )
}

export default GlobalConfiguration