import {
  Flex,
  FormLabel,
  HStack
} from '@chakra-ui/react'
import 'react-calendar/dist/Calendar.css'
import SelectDates from '../../components/selectDates'

const Toolbar = () => {
  return (
    <Flex gap={12}>
      <HStack>
        <SelectDates />
      </HStack>
      <HStack>
        <FormLabel marginBottom={0} marginRight={0}>
          Cuentas
        </FormLabel>
      </HStack>
    </Flex>
  )
}

export default Toolbar
