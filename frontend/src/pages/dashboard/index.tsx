import {
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
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
            <Categories key={item.Id} category={item}/>
          ))}
        </HStack>
      )}
    </>
  )
}

export default Dashboard
