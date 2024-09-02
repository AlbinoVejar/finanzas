import {
  Card,
  CardBody,
  Grid,
  GridItem,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { Account, AccountStateType } from '../../types/account.type'
import DetailsAccount from './details'
import ActionsAccount from './actions'
import TableAllExpenses from './tableExpenses'
import useExpenses from '../../hooks/useExpenses.hook'
import { AccountSelector } from '../../context/accountState'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { UserSelector } from '../../context/userState'
import { UserStateType } from '../../types/user.type'
import { useGetAccounts } from '../../services/accounts.service'

type propsTypes = {
  account: Account
}

const Accounts = async() => {
  let {id:idURL} = useParams();
  const {filters} = useRecoilValue<UserStateType>(UserSelector)
  useGetAccounts({...filters, id: idURL})
  return (
    <Card>
      <CardBody>
        <Grid height="92vh" templateColumns="20% 80%" gap={4}>
          <GridItem borderWidth="1px" borderRadius="lg">
            <VStack gap={2} divider={<StackDivider />}>
              <DetailsAccount />
              <ActionsAccount />
            </VStack>
          </GridItem>
          <GridItem borderWidth="1px" borderRadius="lg">
            <TableAllExpenses />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default Accounts
