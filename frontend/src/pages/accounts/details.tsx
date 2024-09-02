import { Box, Heading, Progress, StackDivider, Text, VStack } from '@chakra-ui/react'
import { FormatCurreny } from '../../utils'

const DetailsAccount = () => {
  return (
    <Box>
      <VStack spacing={2} align='normal' divider={<StackDivider />}>
        <Box>
          <Heading marginTop='10%' textAlign='center'>Nombre Cuenta</Heading>
          <Text align='center' fontSize='xl'>Tarjeta Credito</Text>
        </Box>
        <Box>
          <Text fontSize='xl'>Limite de Credito: {FormatCurreny(100)}</Text>
          <Text fontSize='xl'>Total Usado: {FormatCurreny(100)}</Text>
        </Box>
          <Progress value={50} borderRadius={5} />
      </VStack>
    </Box>
  )
}

export default DetailsAccount