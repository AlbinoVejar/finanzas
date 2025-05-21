import {
  Card,
  CardBody,
  Grid,
  GridItem,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import DetailsAccount from './details'
import ActionsAccount from './actions'
import TableAllExpenses from './tableExpenses'
import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { UserState } from '../../context/userState'
import { UserStateType } from '../../types/user.type'
import { useEffect } from 'react'
import useAccounts from '../../hooks/useAccounts.hook'
import ExpenseModal from '../../components/expense.modal'
import GlobalConfiguration from '../configuration'

const Accounts = () => {
  const { id: idURL } = useParams();
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const { filters } = userState;
  const { getAccount } = useAccounts();
  const { data, refetch } = getAccount({ ...filters, id_account: idURL });
  useEffect(() => {
    if (data) {
      setUserState({ ...userState, details: data, refetches: { detailsAccount: refetch } })
    }
  }, [data])
  return (
    <>
      <Card height='100%'>
        <CardBody padding={{sm: 0, md: 4}}>
          <Grid templateColumns={{base: 'repeat(1, 100%)', sm: "repeat(1, 100%)", md: "repeat(1, 100%)", lg: '20% 80%'}} gap={4} height='100%'>
            <GridItem borderWidth="1px" borderRadius="lg" paddingBottom={{base: 4, sm: 4, md: 0}}>
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
      <ExpenseModal />
      <GlobalConfiguration />
    </>
  )
}

export default Accounts
