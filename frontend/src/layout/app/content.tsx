import { GridItem, StackDivider, VStack } from '@chakra-ui/react'

const MainContent = ({children}: any) => {
  return (
    <GridItem mx={1} bg="floralwhite" area={'main'} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack divider={<StackDivider />} spacing={4} align="stretch" height='100%'>
        {children}
      </VStack>
    </GridItem>
  )
}

export default MainContent