import {
  Card,
  CardBody,
  Grid,
  GridItem,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { Account } from '../../types/account.type'
import DetailsAccount from './details'
import ActionsAccount from './actions'
import TableAllExpenses from './tableExpenses'
import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { UserState } from '../../context/userState'
import { UserStateType } from '../../types/user.type'
import { useEffect } from 'react'
import useAccounts from '../../hooks/useAccounts.hook'

type propsTypes = {
  account: Account
}

const Accounts = () => {
  let {id:idURL} = useParams();
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const {filters} = userState;
  const {getAccount} = useAccounts();
  const { data } = getAccount({...filters, id_account: idURL})
  useEffect(() => {
    if(data){
      setUserState({...userState, details: data})
    }
  }, [data]);
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
