import { Card, CardBody, CardHeader, SimpleGrid, StackDivider, Stat, StatHelpText, StatLabel, StatNumber, Tag, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { ExpenseDetails } from '../types/expense.type';

type propsTypes = {
  expenses: ExpenseDetails[];
};

const ListTable = ({ expenses }: propsTypes) => {
  const variant = useBreakpointValue({
    sm: 1, md: 2
  });
  return (
    <>{
      !!expenses &&
        expenses.length > 0 ?
        (
          <SimpleGrid spacing={2} overflowY='auto' m='1%' maxHeight='50vh' columns={variant}>
            {expenses.map((item: ExpenseDetails) => (
              <Card width="100%" rounded='lg' boxShadow='lg' borderWidth={1}>
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