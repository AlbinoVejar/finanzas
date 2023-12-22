import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { RiSettings3Line } from '@remixicon/react'
import React from 'react'

const Dashboard = () => {
  return (
    <Card>
      <CardHeader>
        <HStack divider={<StackDivider />} gap={8} align="stretch">
          <Box>
            <Avatar />
          </Box>
          <Box justifySelf="flex-start">
            <Heading size="md">Gastos Diarios</Heading>
            <Text>Creator, Chakra UI</Text>
          </Box>
          <Box>
            <IconButton
              isRound
              variant="outline"
              aria-label="Config"
              icon={<RiSettings3Line />}
            />
          </Box>
        </HStack>
      </CardHeader>
      <CardBody>
        <TableContainer borderWidth='2px' borderRadius="lg">
          <Table size="sm" variant='striped' >
            <Thead bg='gainsboro' textColor='black'>
              <Tr>
                <Th>Fecha</Th>
                <Th>Cargo</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Hola</Td>
                <Td>Hola</Td>
                <Td>Hola</Td>
              </Tr>
              <Tr>
                <Td>Hola2</Td>
                <Td>Hola2</Td>
                <Td>Hola2</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default Dashboard
