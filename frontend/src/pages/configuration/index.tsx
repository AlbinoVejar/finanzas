import {
  Box,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ModalTypeState } from '../../types/modal.type';
import { ModalState } from '../../context/modalState';
import TablesSection from './tableConfig';
import { TableHeadersAccounts, TableHeadersCategories } from './headers';
import useAccounts from '../../hooks/useAccounts.hook';
import useCategories from '../../hooks/useCategories.hook';
import ConfigCategoryModal from '../../components/config-category.modal';
import ConfigAccountModal from '../../components/config-account.modal';

const GlobalConfiguration = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState);
  const [openConfigCategoryModal, setOpenConfigCategoryModal] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<any | null>(null);
  const [openConfigAccountModal, setOpenConfigAccountModal] = useState<boolean>(false);
  const [accountSelected, setAccountSelected] = useState<any | null>(null);

  const { data: itemsAccounts } = useAccounts().getAllItemsAccounts();
  const { data: itemsCategories } = useCategories().GetItemsCategories();
  const { globalConfiguration } = open;
  const onCreateCategory = () => {};
  const onEditCategory = () => {};
  const onDeleteCategory = () => {};
  const onCreateAccount = () => {};
  const onEditAccount = () => {};
  const onDeleteAccount = () => {};
  return (
    <>
      <Modal
        isOpen={globalConfiguration}
        isCentered
        onClose={() => {
          setOpen({ ...open, globalConfiguration: false });
        }}
        closeOnEsc
        blockScrollOnMount
        closeOnOverlayClick={false}
        size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configuración</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              maxWidth="80%"
              display="flex"
              flexDirection="column"
              gap={12}>
              <Stack direction="column">
                <Box>
                  <TablesSection
                    title="Categoria"
                    data={itemsCategories ?? []}
                    headers={TableHeadersCategories}
                    onCreate={onCreateCategory}
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                    setOpen={setOpenConfigCategoryModal}
                  />
                </Box>
              </Stack>
              <Stack direction="column">
                <Box>
                  <TablesSection
                    title="Cuenta"
                    data={itemsAccounts ?? []}
                    headers={TableHeadersAccounts}
                    onCreate={onCreateAccount}
                    onEdit={onEditAccount}
                    onDelete={onDeleteAccount}
                    setOpen={setOpenConfigAccountModal}
                  />
                </Box>
              </Stack>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline">Cerrar</Button>
          </ModalFooter>
        </ModalContent>
        <ConfigCategoryModal open={openConfigCategoryModal} setOpen={setOpenConfigCategoryModal} details={categorySelected} />
        <ConfigAccountModal open={openConfigAccountModal} setOpen={setOpenConfigAccountModal} details={accountSelected}/>
      </Modal>
    </>
  );
};

export default GlobalConfiguration;
