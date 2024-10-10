import {
  Box,
  Button,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
import TablesSection from './tableConfig'
import { TableHeadersAccounts, TableHeadersCategories } from './headers'
import useAccounts from '../../hooks/useAccounts.hook'
import useCategories from '../../hooks/useCategories.hook'

const GlobalConfiguration = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState)
  const { data: itemsAccounts } = useAccounts().getAllItemsAccounts()
  const { data: itemsCategories } = useCategories().GetItemsCategories()
  const { globalConfiguration } = open
  const onCreateCategory = () => {}
  const onEditCategory = () => {}
  const onDeleteCategory = () => {}
  const onCreateAccount = () => {}
  const onEditAccount = () => {}
  const onDeleteAccount = () => {}
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
            <Container maxWidth='80%' display='flex' flexDirection='column' gap={12}>
              <Stack direction='column'>
                <Box></Box>
                <Box>
                  <TablesSection title='Categorias' data={itemsCategories ?? []} headers={TableHeadersCategories} onCreate={onCreateCategory} onEdit={onEditCategory} onDelete={onDeleteCategory} />
                </Box>
              </Stack>
              <Stack direction='column'>
                <Box></Box>
                <Box>
                  <TablesSection title='Cuentas' data={itemsAccounts ?? []} headers={TableHeadersAccounts} onCreate={onCreateAccount} onEdit={onEditAccount} onDelete={onDeleteAccount} />
                </Box>
              </Stack>
            </Container>
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
