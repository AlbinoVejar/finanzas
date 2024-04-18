import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Switch,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Account } from '../types/account.type'
import { AccountSelector } from '../context/accountState'
import { UserState } from '../context/userState'
import useResume from '../hooks/useResume.hook'
import { RiArrowDownSLine } from '@remixicon/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import SelectDates from '../components/selectDates'

const Toolbar = () => {
  const accounts = useRecoilValue<Account[]>(AccountSelector)
  const [userState, setUserState] = useRecoilState(UserState)
  const { accountSelected } = userState
  useResume()

  const onChangeAccount = (value: string) => {
    setUserState({ ...userState, accountSelected: Number(value) })
  }

  return (
    <GridItem
      display="flex"
      bg="white"
      boxShadow="base"
      roundedBottom={10}
      area="toolbar"
      justifyContent="center"
      alignItems="center"
    >
      <Flex gap={12}>
        <HStack>
          <SelectDates />
        </HStack>
        <HStack>
          <FormLabel marginBottom={0} marginRight={0}>
            Cuentas
          </FormLabel>
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
        </HStack>
      </Flex>
    </GridItem>
  )
}

export default Toolbar
