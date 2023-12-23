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
  useDisclosure,
} from '@chakra-ui/react'
import { RiAddCircleLine, RiSettings3Line } from '@remixicon/react'
import React from 'react'
import ModalExample from '../../shared/components/modal'
import { useRecoilState } from 'recoil'
import { ModalState } from '../../context/modalState'

const Dashboard = () => {
  const [,setModal] = useRecoilState(ModalState);
  return (
    <>
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
          <Flex justify="flex-start" align="center" marginBottom={2}>
            <Button
              leftIcon={<RiAddCircleLine />}
              onClick={() => setModal(true)}
              size="sm"
              colorScheme="blue"
            >
              Agregar
            </Button>
          </Flex>
          <Box>
            <TableContainer borderWidth="2px" borderRadius="lg">
              <Table size="sm" variant="striped">
                <Thead bg="gainsboro" textColor="black">
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
          </Box>
        </CardBody>
      </Card>
      <ModalExample />
    </>
  )
}

export default Dashboard
