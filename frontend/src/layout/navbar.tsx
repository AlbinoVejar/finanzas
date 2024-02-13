import { Box, Flex, GridItem, Select } from '@chakra-ui/react'
import { RiArrowDownSLine } from '@remixicon/react'
import React from 'react'
import { AccountSelector } from '../context/accountState'
import { Account } from '../types/account.type'
import { useRecoilValue } from 'recoil'

const Navbar = () => {
  const accounts = useRecoilValue<Account[]>(AccountSelector)
  return (
    <GridItem bg="white" boxShadow="base" roundedBottom={10} area={'header'}>
      <Flex
        height="100%"
        justifyContent="space-between"
        alignItems="center"
        // borderWidth="2px"
        px={2}
      >
        <Box>Logo</Box>
        <Box>
          <Select
            placeholder="Selecione una cuenta"
            variant="outline"
            boxShadow="base"
            icon={<RiArrowDownSLine />}
          >
            {accounts.map((e: Account) => (
              <option value={e.Id}>{e.Name}</option>
            ))}
          </Select>
        </Box>
        <Box>UserConfig</Box>
      </Flex>
    </GridItem>
  )
}

export default Navbar
