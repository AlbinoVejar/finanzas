import { Box, Heading, Progress, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FormatCurreny } from '../../utils'
import { useRecoilValue } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'
import { TotalWasteAccount } from '../../types/account.type'

const DetailsAccount = () => {
  const {details} = useRecoilValue<UserStateType>(UserSelector);
  const {Account, Limit_amount, Total}: TotalWasteAccount = details;
  const ValueLimit = Number((Total*100)/Limit_amount);
  const LimitCondition = ValueLimit >= 100 ? 101 : ValueLimit;
  return (
    <Box>
      <Stack spacing={2} align='normal' divider={<StackDivider />}>
        <Box>
          <Heading marginTop='10%' textAlign='center'>{Account}</Heading>
          <Text align='center' fontSize='xl'>Tarjeta Credito</Text>
        </Box>
        <Box>
          <Text fontSize='xl'>Total Usado: {FormatCurreny(Total)}</Text>
          <Text fontSize='xl'>Limite de Credito: {FormatCurreny(Limit_amount)}</Text>
        </Box>
          <Progress value={LimitCondition} borderRadius={5} colorScheme={LimitCondition > 100 ? 'red' : LimitCondition === 100 ? 'green' : 'blue'}/>
      </Stack>
    </Box>
  )
}

export default DetailsAccount