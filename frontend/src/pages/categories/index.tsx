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
  VStack,
} from '@chakra-ui/react'
import { RiSettings3Line, RiAddCircleLine } from '@remixicon/react'
import { ModalState } from '../../context/modalState'
import { useRecoilState } from 'recoil'
import ExpenseModal from '../../components/expense.modal'
import { Category, TotalCategory } from '../../types/category.type'
import { ResumeExpense } from '../../types/expense.type'
import { TableHeaderType } from '../../types/table.type'
import { UserState } from '../../context/userState';
import daysjs from 'dayjs'
import Quicktable from '../../components/quicktable'
import { FormatCurreny, FormatMonthDate } from '../../utils'

interface propTypes {
  category: Category
  total: TotalCategory | undefined
  resume: ResumeExpense[]
}

const Categories = ({ category, total, resume }: propTypes) => {
  const [, setModal] = useRecoilState(ModalState)
  const [userState, setUserState] = useRecoilState(UserState)
  const { Init_date, End_date } = userState
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
          <Heading textAlign="center" size="lg">
            {category.Name}
          </Heading>
          <HStack
            divider={<StackDivider />}
            gap={8}
            align="center"
            justify="center"
            marginTop={4}
          >
            <Box>
              <Avatar />
            </Box>
            <VStack>
              <Stat>
                <StatLabel>Totales</StatLabel>
                <StatNumber>{FormatCurreny(total?.Total ?? 0)}</StatNumber>
                <StatHelpText>
                </StatHelpText>
              </Stat>
            </VStack>
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
              <Quicktable
                headers={headers}
                data={resume}
                keyTable={category.Name}
              />
            )}
          </Box>
        </CardBody>
      </Card>
      <ExpenseModal />
    </>
  )
}

export default Categories
