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
  IconButton,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react'
import { RiSettings3Line, RiAddCircleLine } from '@remixicon/react'
import Quicktable from '../../shared/components/quicktable'
import { ModalState } from '../../context/modalState'
import { useRecoilState } from 'recoil'
import ExpenseModal from '../../shared/components/expense.modal'
import { Category } from '../../types/category.type'
import { ResumeExpense } from '../../types/expense.type'
import { TableHeaderType } from '../../types/table.type'

interface propTypes {
  category: Category
  resume: ResumeExpense[]
}

const Categories = ({ category, resume }: propTypes) => {
  const [, setModal] = useRecoilState(ModalState)
  const headers: TableHeaderType[] = [
    { id: 'Description', label: 'Descripción', empty: '-' },
    { id: 'Amount', label: 'Gasto', empty: '-' },
    { id: 'Created_at', label: 'Fecha', empty: '-' },
    { id: 'actions', label: 'Acciones', empty: '-' },
  ]
  return (
    <>
      <Card>
        <CardHeader>
          <HStack divider={<StackDivider />} gap={8} align="center">
            <Box>
              <Avatar />
            </Box>
            <Box justifySelf="flex-start">
              <Heading size="md">{category.Name}</Heading>
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
            {resume.length > 0 && (
              <Quicktable headers={headers} data={resume} keyTable={category.Name} />
            )}
          </Box>
        </CardBody>
      </Card>
      <ExpenseModal />
    </>
  )
}

export default Categories
