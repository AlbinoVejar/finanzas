import { Box, Flex, GridItem } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <GridItem bg="orange.300" area={'header'}>
      <Flex
        height="100%"
        justifyContent="space-between"
        borderWidth="2px"
        px={2}
      >
        <Box>Logo</Box>
        <Box>Direction</Box>
        <Box>UserConfig</Box>
      </Flex>
    </GridItem>
  )
}

export default Navbar
