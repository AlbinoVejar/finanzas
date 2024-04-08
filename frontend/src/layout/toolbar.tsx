import { Box, Flex, GridItem, Icon, Select } from '@chakra-ui/react'
import React from 'react'

const Toolbar = () => {
  return (
    <GridItem bg="white" boxShadow="base" roundedBottom={10}>
      <Flex
        height="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          hola
        </Box>
      </Flex>
    </GridItem>
  )
}

export default Toolbar
