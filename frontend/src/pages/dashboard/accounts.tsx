import { useRecoilState } from 'recoil'
import { Card, CardBody, CardHeader, Flex, HStack, Heading, IconButton, StackDivider, Stat, StatLabel, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UserState } from '../../context/userState'
import { RiEyeLine, RiSettings3Line } from '@remixicon/react'
import { FormatCurreny } from '../../utils'
import { Account } from '../../types/account.type'

type propsTypes = {
  account: Account
}

const AccountsDashboard = ({ account }: propsTypes) => {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(UserState)
  function onOpenDetails(value: number | undefined): void {
    setUserState({...userState, accountSelected: value ?? 0})
    navigate(`cuenta/${value}`)
  }
  
  return (
    <Card>
      <CardHeader>
        <Heading textAlign="center" size="lg">
          {account.Name}
        </Heading>
        <HStack
          divider={<StackDivider />}
          gap={8}
          align="center"
          justify="center"
          marginTop={4}
        >
          <VStack>
            <Stat>
              <StatLabel>Total Usado: {FormatCurreny(0)}</StatLabel>
              <StatLabel>Limite: {FormatCurreny(account.Limit_amount)}</StatLabel>
              {/* <StatNumber>{FormatCurreny(total?.Total ?? 0)}</StatNumber> */}
              {/* <StatHelpText>{getDate()}</StatHelpText> */}
            </Stat>
          </VStack>
          <Flex gap={2}>
            <IconButton
              isRound
              variant="outline"
              aria-label="Ver Detalles"
              icon={<RiEyeLine />}
              onClick={() => onOpenDetails(account.Id)}
            />
            <IconButton
              isRound
              variant="outline"
              aria-label="Config"
              icon={<RiSettings3Line />}
            // onClick={onOpenConfigModal}
            />
          </Flex>
        </HStack>
      </CardHeader>
      <CardBody>
        {/* <Flex justify="flex-start" align="center" marginBottom={2}>
            <Button
              leftIcon={<RiAddCircleLine />}
              onClick={onOpenModal}
              size="sm"
              colorScheme="blue"
            >
              Agregar
            </Button>
          </Flex> */}
        {/* <Box>
            {resume.length > 0 && (
              <Quicktable
                headers={headers}
                data={resume}
                keyTable={category.Name}
              />
            )}
          </Box> */}
      </CardBody>
    </Card>
  )
}

export default AccountsDashboard