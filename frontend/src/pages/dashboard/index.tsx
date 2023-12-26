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
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
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
import Quicktable from '../../shared/components/quicktable'
import { TableState } from '../../context/tableState'

const Dashboard = () => {
  const [, setModal] = useRecoilState(ModalState)
  const [, setDataTable] = useRecoilState(TableState)
  React.useEffect(() => {
    setDataTable({
      headers: [
        { id: 'id', label: 'Fecha', empty: '-' },
        { id: 'cost', label: 'Gasto', empty: '-' },
        { id: 'actions', label: 'Acciones', empty: '-' },
      ],
      data: [{ id: 'hola', cost: '' }],
    })
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <HStack divider={<StackDivider />} gap={8} align="center">
            <Box>
              <Avatar />
            </Box>
            <Box justifySelf="flex-start">
              <Heading size="md">Gastos Diarios</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Totales</StatLabel>
                <StatNumber>$0.00</StatNumber>
                <StatHelpText>Dec 01 - Dec 31</StatHelpText>
              </Stat>
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
            <Quicktable />
          </Box>
        </CardBody>
      </Card>
      <ModalExample />
    </>
  )
}

export default Dashboard
