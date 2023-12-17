import { Box, GridItem, StackDivider, VStack } from '@chakra-ui/react'
import React from 'react'
import Breadcrum from './breadcrum'

const MainContent = ({children}: any) => {
  return (
    <GridItem mx={1} bg="green.300" area={'main'} borderWidth="2px" borderRadius="lg">
      <VStack divider={<StackDivider />} spacing={2} align="stretch">
        <Breadcrum />
        {children}
      </VStack>
    </GridItem>
  )
}

export default MainContent
