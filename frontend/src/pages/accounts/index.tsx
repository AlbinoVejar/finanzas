import { Card, CardBody, CardHeader, Grid, GridItem, Heading, StackDivider, VStack } from '@chakra-ui/react'
import { Account } from '../../types/account.type'
import { useNavigate } from 'react-router-dom'
import DetailsAccount from './details'
import ActionsAccount from './actions'
import TableAllExpenses from './tableExpenses'

type propsTypes = {
  account: Account
}

const Accounts = () => {
  const navigate = useNavigate();
  console.log('navigate', navigate)
  return (
    <>
      <Card>
        <CardBody>
          <Grid
            height='92vh'
            templateColumns='20% 80%'
            gap={4}
          >
            <GridItem borderWidth='1px' borderRadius='lg'>
              <VStack gap={2} divider={<StackDivider />}>
                <DetailsAccount />
                <ActionsAccount />
              </VStack>
            </GridItem>
            <GridItem borderWidth='1px' borderRadius='lg'>
              <TableAllExpenses />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  )
}

export default Accounts
