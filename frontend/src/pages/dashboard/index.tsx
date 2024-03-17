import {
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { TableState } from '../../context/tableState'
import Categories from '../categories'
import { Category } from '../../types/category.type'
import useAccounts from '../../hooks/useAccounts.hook'
import useResume from '../../hooks/useResume.hook'

const Dashboard = () => {
  const [, setDataTable] = useRecoilState(TableState)
  useAccounts().query;
  const { isLoading, isError, data, error } = useResume().query
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
        <HStack spacing={6} justify="center" margin="1rem 1rem">
          {data?.map((item: Category) => (
            <Categories key={item.Id} category={item}/>
          ))}
        </HStack>
      )}
    </>
  )
}

export default Dashboard
