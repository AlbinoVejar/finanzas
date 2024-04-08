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
import React, { useEffect } from 'react'
import { GetTotalsByAccount } from '../services/accounts.service'
import { UserDashboard } from '../types/user.type'
import { CategoryState } from '../context/categoryState'
import { Category, TotalCategory } from '../types/category.type'

const Navbar = () => {
  const accounts = useRecoilValue<Account[]>(AccountSelector)
  const [userState, setUserState] = useRecoilState(UserState)
  const [categories, setCategories] = useRecoilState(CategoryState)
  const { accountSelected } = userState

  const onChangeAccount = (value: string) => {
    console.log('onSelect', value)
    setUserState({...userState, accountSelected: Number(value)});
  }

  const getTotals = async () => {
    const request: UserDashboard = {
      Id: userState.idUser,
      Id_account: userState.accountSelected,
      Init_date: userState.Init_date,
      End_date: userState.End_date
    }
    const resp = await GetTotalsByAccount(request);
    const newCategories: Category[] = categories.data.map((category: Category) => ({
      ...category,
      Total: resp.data.find((item: TotalCategory) => item.Id_category === category.Id)?.Total
    }));
    setCategories({...categories, data: newCategories});
  }

  useEffect(() => {
    if(Number(userState.accountSelected !== 0)){
      getTotals();
    }
  }, [userState.accountSelected]);

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
