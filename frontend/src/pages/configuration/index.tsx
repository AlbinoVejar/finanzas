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
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ModalTypeState } from '../../types/modal.type';
import { ModalState } from '../../context/modalState';
import TablesSection from './tableConfig';
import { TableHeadersAccounts, TableHeadersCategories } from './headers';
import useAccounts from '../../hooks/useAccounts.hook';
import useCategories from '../../hooks/useCategories.hook';
import ConfigCategoryModal from '../../components/config-category.modal';
import ConfigAccountModal from '../../components/config-account.modal';
import DeleteDialog from '../../components/delete.dialog';

const GlobalConfiguration = () => {
  const cancelRef = useRef();
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState);
  const [openConfigCategoryModal, setOpenConfigCategoryModal] =
    useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<any | null>(null);
  const [openConfigAccountModal, setOpenConfigAccountModal] =
    useState<boolean>(false);
  const [accountSelected, setAccountSelected] = useState<any | null>(null);

  const { data: itemsAccounts } = useAccounts().getAllItemsAccounts();
  const { GetItemsCategories, DeleteCategory, createCategory, updateCategory } =
    useCategories();
  const { data: itemsCategories, refetch: refetchCategories } = GetItemsCategories();
  const { mutateAsync: DeleteMutationCategory } = DeleteCategory;
  const { mutateAsync: CreateMutationCategory } = createCategory;
  const { mutateAsync: UpdateMutationCategory } = updateCategory
  const { globalConfiguration } = open;
  const onCreateCategory = async (values: any) => {
    await CreateMutationCategory(values);
    refetchCategories();
    setOpenConfigCategoryModal(false);
  };
  const onEditCategory = async (values: any) => {
    await UpdateMutationCategory(values);
    refetchCategories();
    setCategorySelected(null);
    setOpenConfigCategoryModal(false);
  };
  const onDeleteCategory = async () => {
    await DeleteMutationCategory(categorySelected.Id)
    refetchCategories();
    setCategorySelected(null);
  };
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
                    onEdit={onEditCategory}
                    onDelete={onDeleteCategory}
                    setOpen={setOpenConfigCategoryModal}
                    setSelected={setCategorySelected}
                  />
                </Box>
              </Stack>
              <Stack direction="column">
                <Box>
                  <TablesSection
                    title="Cuenta"
                    data={itemsAccounts ?? []}
                    headers={TableHeadersAccounts}
                    onEdit={onEditAccount}
                    onDelete={onDeleteAccount}
                    setOpen={setOpenConfigAccountModal}
                    setSelected={setAccountSelected}
                  />
                </Box>
              </Stack>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline">Cerrar</Button>
          </ModalFooter>
        </ModalContent>
        <ConfigCategoryModal
          open={openConfigCategoryModal}
          setOpen={setOpenConfigCategoryModal}
          details={categorySelected}
          onHandlerSubmit={
            !!categorySelected ? onEditCategory : onCreateCategory
          }
        />
        <ConfigAccountModal
          open={openConfigAccountModal}
          setOpen={setOpenConfigAccountModal}
          details={accountSelected}
        />
        {/* <DeleteDialog
          title={`Eliminar elemento`}
          message={`¿Estás seguro de eliminar este elemento?`}
          htmlRef={cancelRef}
          onConfirm={() => { console.log('HEEWERERERE')}}
        /> */}
      </Modal>
    </>
  );
};

export default GlobalConfiguration;
