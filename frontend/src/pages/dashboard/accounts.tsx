import { Card, CardBody, CardHeader, Flex, HStack, Heading, IconButton, StackDivider, Stat, StatLabel, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RiEyeLine, RiSettings3Line } from '@remixicon/react'
import { FormatCurreny } from '../../utils'
import { Account, TotalWasteAccount } from '../../types/account.type'
import ConfigAccountModal from '../../components/config-account.modal'
import { useState } from 'react'
import useAccounts from '../../hooks/useAccounts.hook'
import { useRecoilValue } from 'recoil'
import { UserStateType } from '../../types/user.type'
import { UserSelector } from '../../context/userState'

type propsTypes = {
  account: TotalWasteAccount
}

const AccountsDashboard = ({ account }: propsTypes) => {
  const navigate = useNavigate();
  const {filters} = useRecoilValue<UserStateType>(UserSelector)
  const [openConfig, setOpenConfig] = useState(false);
  const [accountSelected, setAccountSelected] = useState<Account | null>(null);
  const { getAccounts, updateAccount } =
    useAccounts();
  const { refetch } = getAccounts(filters);
  const { mutateAsync } = updateAccount;
  const onOpenDetails = (value: number | undefined): void => {
    navigate(`cuenta/${value}`)
  }
  const onOpenConfig = () => {
    setAccountSelected({
      Id: account.Id_Account,
      Name: account.Account,
      Credit: account.Credit,
      Limit_amount: account.Limit_amount
    })
    setOpenConfig(true);
  }

  const onEditAccount = async (values: Account) => { 
    await mutateAsync(values);
    refetch();
    setAccountSelected(null);
    setOpenConfig(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading textAlign="center" size="lg">
            {account.Account}
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
                <StatLabel>Total Usado: {FormatCurreny(account.Total)}</StatLabel>
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
                onClick={() => onOpenDetails(account.Id_Account)}
              />
              <IconButton
                isRound
                variant="outline"
                aria-label="Config"
                icon={<RiSettings3Line />}
                onClick={onOpenConfig}
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
      <ConfigAccountModal
        open={openConfig}
        setOpen={setOpenConfig}
        details={accountSelected}
        onHandlerSubmit={!!accountSelected && onEditAccount}
      />
    </>
  )
}

export default AccountsDashboard