import { Box, GridItem, StackDivider, VStack } from '@chakra-ui/react'
import React from 'react'
import Breadcrum from './breadcrum'

const MainContent = ({children}: any) => {
  return (
    <GridItem mx={1} bg="floralwhite" area={'main'} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack divider={<StackDivider />} spacing={4} align="stretch">
        {children}
      </VStack>
    </GridItem>
  )
}

export default MainContent
