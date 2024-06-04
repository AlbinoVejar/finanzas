import {
  Box,
  Flex,
  GridItem,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { RiUserSettingsLine, RiWallet3Line } from '@remixicon/react'
import Toolbar from './toolbar'
import ConfigUserModal from '../components/config-user.modal'
import { useState } from 'react'

const Navbar = () => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false)
  const onOpenConfigModal = () => {
    setOpenConfigModal(true)
  }
  return (
    <>
      <GridItem bg="white" boxShadow="base" roundedBottom={10} area={'header'}>
        <Flex
          height="100%"
          justifyContent="space-between"
          alignItems="center"
          // borderWidth="2px"
          px={2}
        >
          <Box>
            <Icon aria-label="Logo Wallet" h={8} w={8} as={RiWallet3Line} />
          </Box>
          <Box>
            <Toolbar />
          </Box>
          <Box>
            <Menu isLazy placement="auto">
              <MenuButton
                as={IconButton}
                aria-label="Account Settings"
                variant="outline"
                icon={<RiUserSettingsLine size={28} />}
              />
              <MenuList>
                <MenuItem onClick={onOpenConfigModal}>Configuración</MenuItem>
                <MenuItem>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </GridItem>
      <ConfigUserModal open={openConfigModal} setOpen={setOpenConfigModal} />
    </>
  )
}

export default Navbar
