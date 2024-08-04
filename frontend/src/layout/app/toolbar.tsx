import {
  Flex,
  FormLabel,
  HStack,
  Select
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Account } from '../../types/account.type'
import { AccountSelector } from '../../context/accountState'
import { UserState } from '../../context/userState'
import useResume from '../../hooks/useResume.hook'
import { RiArrowDownSLine } from '@remixicon/react'
import 'react-calendar/dist/Calendar.css'
import SelectDates from '../../components/selectDates'

const Toolbar = () => {
  // const accounts = useRecoilValue<Account[]>(AccountSelector)
  // const [userState, setUserState] = useRecoilState(UserState)
  // const { accountSelected } = userState
  // useResume()

  // const onChangeAccount = (value: string) => {
  //   setUserState({ ...userState, accountSelected: Number(value) })
  // }

  return (
    <Flex gap={12}>
      <HStack>
        <SelectDates />
      </HStack>
      <HStack>
        <FormLabel marginBottom={0} marginRight={0}>
          Cuentas
        </FormLabel>
        {/* <Select
          placeholder="Selecione una cuenta"
          size="sm"
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
        </Select> */}
      </HStack>
    </Flex>
  )
}

export default Toolbar
