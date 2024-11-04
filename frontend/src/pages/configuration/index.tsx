import {
  Button,
  Divider,
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
import { Account } from '../../types/account.type';

const GlobalConfiguration = () => {
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState);
  const [openConfigCategoryModal, setOpenConfigCategoryModal] =
    useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<any | null>(null);
  const [openConfigAccountModal, setOpenConfigAccountModal] =
    useState<boolean>(false);
  const [accountSelected, setAccountSelected] = useState<Account | null>(null);

  const { getAllItemsAccounts, createAccount, updateAccount, deleteAccount } =
    useAccounts();
  const { data: itemsAccounts, refetch: refetchAccounts } = getAllItemsAccounts();
  const { mutateAsync: CreateMutationAccount } = createAccount;
  const { mutateAsync: UpdateMutationAccount } = updateAccount;
  const { mutateAsync: DeleteMutationAccount } = deleteAccount;
  const { GetItemsCategories, DeleteCategory, createCategory, updateCategory } =
    useCategories();
  const { data: itemsCategories, refetch: refetchCategories } =
    GetItemsCategories();
  const { mutateAsync: DeleteMutationCategory } = DeleteCategory;
  const { mutateAsync: CreateMutationCategory } = createCategory;
  const { mutateAsync: UpdateMutationCategory } = updateCategory;
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
    await DeleteMutationCategory(categorySelected.Id);
    refetchCategories();
    setCategorySelected(null);
  };
  const onCreateAccount = async (values: Account) => {
    await CreateMutationAccount(values);
    refetchAccounts();
    setOpenConfigAccountModal(false);
  };
  const onEditAccount = async (values: Account) => {
    await UpdateMutationAccount(values);
    refetchAccounts();
    setAccountSelected(null);
    setOpenConfigAccountModal(false);
  };
  const onDeleteAccount = async () => {
    if (accountSelected?.Id) {
      await DeleteMutationAccount(accountSelected.Id);
      refetchAccounts();
      setOpenConfigAccountModal(false);
    }
  };
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
          <Divider />
          <ModalBody>
            <Stack direction="column" gap={12}>
              <TablesSection
                title="Categoria"
                data={itemsCategories ?? []}
                headers={TableHeadersCategories}
                onDelete={onDeleteCategory}
                setOpen={setOpenConfigCategoryModal}
                setSelected={setCategorySelected}
              />
              <TablesSection
                title="Cuenta"
                data={itemsAccounts ?? []}
                headers={TableHeadersAccounts}
                onDelete={onDeleteAccount}
                setOpen={setOpenConfigAccountModal}
                setSelected={setAccountSelected}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setOpen({ ...open, globalConfiguration: false })}
            >Cerrar</Button>
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
          onHandlerSubmit={!!accountSelected ? onEditAccount : onCreateAccount}
        />
      </Modal>
    </>
  );
};

export default GlobalConfiguration;
