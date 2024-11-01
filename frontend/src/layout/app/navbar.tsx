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
} from '@chakra-ui/react'
import { RiUserSettingsLine, RiWallet3Line } from '@remixicon/react'
import { useRecoilState } from 'recoil'
import { ModalTypeState } from '../../types/modal.type'
import { ModalState } from '../../context/modalState'
import GlobalConfiguration from '../../pages/configuration'
import { UserState } from '../../context/userState'
import { UserStateType } from '../../types/user.type'

const Navbar = () => {
  const [userState, setValue] = useRecoilState<UserStateType>(UserState);
  const [open, setOpen] = useRecoilState<ModalTypeState<any>>(ModalState);
  const onOpenConfigModal = () => {
    setOpen({...open, globalConfiguration: true})
  }
  const onLogOut = () => {
    localStorage.removeItem('userToken');
    setValue({...userState, token: ''})
  }
  return (
    <>
      <GridItem bg="white" boxShadow="base" roundedBottom={10} area={'header'}>
        <Flex
          height="100%"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Box>
            <Icon aria-label="Logo Wallet" h={8} w={8} as={RiWallet3Line} />
          </Box>
          <Box>
            {/* <Toolbar /> */}
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
                <MenuItem onClick={onLogOut}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </GridItem>
      <GlobalConfiguration />
    </>
  )
}

export default Navbar
