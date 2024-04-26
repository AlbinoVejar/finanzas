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
import Quicktable from '../../components/quicktable'
import { FormatCurreny, ParseDate } from '../../utils'
import { useState } from 'react'
import ConfigCategoryModal from '../../components/config-category.modal'

interface propTypes {
  category: Category
  total: TotalCategory | undefined
  resume: ResumeExpense[]
}

const Categories = ({ category, total, resume }: propTypes) => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);
  const [, setModal] = useRecoilState(ModalState)
  const [userState, setUserState] = useRecoilState(UserState)
  const { Init_date, End_date, dateMode } = userState
  const headers: TableHeaderType[] = [
    { id: 'Description', label: 'Descripción', empty: '-' },
    { id: 'Amount', label: 'Gasto', empty: '-' },
    { id: 'Created_at', label: 'Fecha', empty: '-' },
    { id: 'actions', label: 'Acciones', empty: '-' },
  ]
  const getDate = () => {
    if(!dateMode){
      return `${ParseDate(Init_date, true)}`
    }else{
      return `${ParseDate(Init_date)} - ${ParseDate(End_date)}`
    }
  }
  const onOpenModal = () => {
    setModal(true);
    setUserState({...userState, categorySelected: category.Id});
  }
  const onOpenConfigModal = () => {
    setOpenConfigModal(!openConfigModal);
  }
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
                <StatHelpText>{getDate()}</StatHelpText>
              </Stat>
            </VStack>
            <Box>
              <IconButton
                isRound
                variant="outline"
                aria-label="Config"
                icon={<RiSettings3Line />}
                onClick={onOpenConfigModal}
              />
            </Box>
          </HStack>
        </CardHeader>
        <CardBody>
          <Flex justify="flex-start" align="center" marginBottom={2}>
            <Button
              leftIcon={<RiAddCircleLine />}
              onClick={onOpenModal}
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
      <ConfigCategoryModal open={openConfigModal} setOpen={setOpenConfigModal} />
      <ExpenseModal />
    </>
  )
}

export default Categories
