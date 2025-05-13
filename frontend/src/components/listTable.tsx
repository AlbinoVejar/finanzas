import { Card, CardBody, CardFooter, CardHeader, SimpleGrid, Stat, StatHelpText, StatLabel, StatNumber, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { ExpenseDetails } from '../types/expense.type';

type propsTypes = {
  expenses: ExpenseDetails[];
  showActions: boolean;
};

const ListTable = ({ expenses, showActions = false }: propsTypes) => {
  const variant = useBreakpointValue({
    sm: 1, md: 2
  });
  return (
    <>{
      !!expenses &&
        expenses.length > 0 ?
        (
          <SimpleGrid spacing={4} overflowY='auto' m='1%' maxHeight='50vh' columns={variant}>
            {expenses.map((item: ExpenseDetails) => (
              <Card key={item.Id} width="100%" rounded='lg' boxShadow='lg' borderWidth={1}>
                <CardHeader display='flex' gap={2} p={2}>
                  <Tag size='lg' variant='solid' colorScheme='blue'>{item.Account}</Tag>
                  <Tag size='lg' variant='solid' colorScheme='green'>{item.Category}</Tag>
                </CardHeader>
                <CardBody p={2}>
                  <SimpleGrid columns={2}>
                    <Stat>
                      <StatLabel><strong>Descripción:</strong> {item.Description}</StatLabel>
                      <StatNumber>$ {item.Amount}</StatNumber>
                      <StatHelpText><strong>Fecha:</strong> {item.Date_expense}</StatHelpText>
                    </Stat>
                  </SimpleGrid>
                </CardBody>
                {showActions && <CardFooter>
                  {}
                </CardFooter>}
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize='2xl'>Sin datos</Text>
        )
    }
    </>
  )
}

export default ListTable