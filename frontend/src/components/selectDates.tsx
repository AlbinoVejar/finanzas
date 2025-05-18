import {
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Switch,
} from '@chakra-ui/react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import { useRecoilState } from 'recoil'
import { UserState } from '../context/userState'
import dayjs from 'dayjs'
import { FormatDate, ParseDate } from '../utils'

const SelectDates = () => {
  const [modeSelect, setModeSelect] = useState<boolean>()
  const [, setDate] = useState<string>('')
  const [userState, setUserState] = useRecoilState(UserState)

  const onChangeDataInput = (value: any) => {
    if (modeSelect) {
      const newDateInitFilter = ParseDate(value[0])
      const newDateEndFilter = ParseDate(value[1])
      setUserState({
        ...userState,
        filters: {
          ...userState.filters,
          init_date: newDateInitFilter,
          end_date: newDateEndFilter,
          current: dayjs().format(FormatDate),
        }
      })
      setDate(`${newDateInitFilter} - `)
    } else {
      const newDateInitFilter = dayjs(value).startOf('month').format(FormatDate)
      const newDateEndFilter = dayjs(value).endOf('month').format(FormatDate)
      setUserState({
        ...userState,
        filters: {
          ...userState.filters,
          init_date: newDateInitFilter,
          end_date: newDateEndFilter,
          current: dayjs().format(FormatDate)
        }
      })
    }
  }

  const displayDate = () => {
    if (!modeSelect) {
      return `${ParseDate(userState.filters.init_date, true)}`
    } else {
      return `${ParseDate(userState.filters.init_date)} - ${ParseDate(userState.filters.end_date)}`
    }
  }

  const onChangeSwitch = () => setModeSelect(!modeSelect)

  return (
    <Popover>
      <PopoverTrigger>
        <Input readOnly value={displayDate()} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Rango de Fechas
              </FormLabel>
              <Switch id="email-alerts" onChange={onChangeSwitch} />
            </FormControl>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            <Calendar
              onChange={onChangeDataInput}
              maxDetail={modeSelect ? 'month' : 'year'}
              selectRange={modeSelect}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>

  )
}

export default SelectDates
