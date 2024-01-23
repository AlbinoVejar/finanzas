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
import ModalExample from '../../shared/components/expense.modal'
import { useRecoilState } from 'recoil'
import { ModalState } from '../../context/modalState'
import Quicktable from '../../shared/components/quicktable'
import { TableState } from '../../context/tableState'
import useCategories from '../../hooks/useCategories.hook'
import Categories from '../categories'
import { Category } from '../../types/category.type'

const Dashboard = () => {
  const [, setDataTable] = useRecoilState(TableState)
  const { isLoading, isError, data, error } = useCategories().query
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
      {isLoading ? (
        <p>...</p>
      ) : isError ? (
        <span>Error:{error.message}</span>
      ) : (
        <HStack spacing={6} justify="center">
          {data?.map((item: Category) => (
            <Categories category={item}/>
          ))}
        </HStack>
      )}
    </>
  )
}

export default Dashboard
