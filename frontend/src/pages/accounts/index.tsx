import {
  Card,
  CardBody,
  Grid,
  GridItem,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { Account } from '../../types/account.type'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsAccount from './details'
import ActionsAccount from './actions'
import TableAllExpenses from './tableExpenses'
import { useGetTotalsQuery } from '../../services/accounts.service'
import { useGetAllExpensesAccountQuery } from '../../services/expenses.service'

type propsTypes = {
  account: Account
}

const Accounts = () => {
  const { id } = useParams()
  const query = useGetTotalsQuery(Number(id))
  const expenses = useGetAllExpensesAccountQuery(Number(id));

  return (
    <>
      {query.isSuccess && (
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
      )}
    </>
  )
}

export default Accounts
