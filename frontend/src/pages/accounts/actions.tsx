import { Button, VStack } from '@chakra-ui/react'
import { RiAddFill, RiArrowGoBackFill, RiToolsFill } from '@remixicon/react'
import React from 'react'

const ActionsAccount = () => {
  return (
    <>
      <VStack spacing={4} justify='center' align='strech'>
        <Button colorScheme='blue' leftIcon={<RiAddFill />}>Agregar Gasto</Button>
        <Button colorScheme='gray' leftIcon={<RiToolsFill />}>Configuración</Button>
        <Button variant='outline' leftIcon={<RiArrowGoBackFill />}>Mis Cuentas</Button>
      </VStack>
    </>
  )
}

export default ActionsAccount