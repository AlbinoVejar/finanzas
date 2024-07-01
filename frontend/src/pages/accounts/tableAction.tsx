import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { RiDeleteBin2Fill, RiEditFill, RiMore2Fill } from '@remixicon/react'
import React from 'react'

type propsTypes = {
  row: any
}

const TableAction = ({row}: propsTypes) => {
  return (
    <Menu isLazy placement='auto'>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<RiMore2Fill />}
      />
      <MenuList>
        <MenuItem icon={<RiEditFill />}>
          Editar
        </MenuItem>
        <MenuItem icon={<RiDeleteBin2Fill />}>
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default TableAction