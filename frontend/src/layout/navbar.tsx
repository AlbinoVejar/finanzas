import { Box, Flex, GridItem, Icon, IconButton, Select } from '@chakra-ui/react'
import {
  RiArrowDownSLine,
  RiUserSettingsLine,
  RiWallet3Line,
} from '@remixicon/react'
import { AccountSelector } from '../context/accountState'
import { Account } from '../types/account.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserState } from '../context/userState'
import React from 'react'

const Navbar = () => {
  const accounts = useRecoilValue<Account[]>(AccountSelector)
  const [userState, setUserState] = useRecoilState(UserState)
  const { accountSelected } = userState

  const onChangeAccount = (value: string) => {
    console.log('onSelect', value)
    setUserState({...userState, accountSelected: Number(value)});
  }

  return (
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
          <Select
            placeholder="Selecione una cuenta"
            variant="outline"
            boxShadow="base"
            icon={<RiArrowDownSLine />}
            value={String(accountSelected)}
            onChange={(event: any) => onChangeAccount(event.target.value)}
          >
            {accounts.map((e: Account) => (
              <option key={e.Id} value={e.Id}>
                {e.Name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <IconButton
            aria-label="Account Settings"
            variant="outline"
            icon={<RiUserSettingsLine size={28} />}
          />
        </Box>
      </Flex>
    </GridItem>
  )
}

export default Navbar
