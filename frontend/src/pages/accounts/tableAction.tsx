import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { RiDeleteBin2Fill, RiEditFill, RiMore2Fill } from '@remixicon/react'
import React, { useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { ModalState } from '../../context/modalState'
import { ModalTypeState } from '../../types/modal.type'
import { Expense } from '../../types/expense.type'

type propsTypes = {
  row: Expense
}

const TableAction = ({row}: propsTypes) => {
  const refresh = useRecoilRefresher_UNSTABLE(ModalState);
  const [modalState, setModalState] = useRecoilState<ModalTypeState<Expense>>(ModalState);
  const onOpenDetailsModal = () => {
    setModalState({...modalState, details: row , expense: true})
  }
  const onOpenDeleteModal = () => {
    setModalState({...modalState, details: row, deleteExpense: true})
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Menu isLazy placement='auto'>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<RiMore2Fill />}
      />
      <MenuList>
        <MenuItem icon={<RiEditFill />} onClick={onOpenDetailsModal}>
          Editar
        </MenuItem>
        <MenuItem icon={<RiDeleteBin2Fill />} onClick={onOpenDeleteModal}>
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default TableAction