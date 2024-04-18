import { Box, Flex, GridItem, Icon, IconButton } from '@chakra-ui/react'
import { RiUserSettingsLine, RiWallet3Line } from '@remixicon/react'

const Navbar = () => {
  return (
    <GridItem bg="white" boxShadow="base" roundedBottom={10} area={'header'}>
      <Flex
        height="100%"
        justifyContent="space-between"
        alignItems="center"
        // borderWidth="2px"
        px={2}
      >
        <Box>
          <Icon aria-label="Logo Wallet" h={8} w={8} as={RiWallet3Line} />
        </Box>
        <Box>
          <IconButton
            aria-label="Account Settings"
            variant="outline"
            icon={<RiUserSettingsLine size={28} />}
          />
        </Box>
      </Flex>
    </GridItem>
  )
}

export default Navbar
