import { Card, CardHeader, Heading, HStack, StackDivider, Avatar, VStack, Stat, StatLabel, StatNumber, StatHelpText, Flex, IconButton, CardBody, Button, Box } from '@chakra-ui/react'
import { RiEyeLine, RiSettings3Line, RiAddCircleLine } from '@remixicon/react'
import React from 'react'
import { FormatCurreny } from '../../utils'
import { Account } from '../../types/account.type'

type propsTypes = {
  account: Account
}

const Accounts = ({account}: propsTypes) => {
  return (
    <>
    <Card>
        <CardHeader>
          <Heading textAlign="center" size="lg">
            {account.Name}
          </Heading>
          <HStack
            divider={<StackDivider />}
            gap={8}
            align="center"
            justify="center"
            marginTop={4}
          >
            <VStack>
              <Stat>
                <StatLabel>Total Usado:</StatLabel>
                <StatLabel>Limite: </StatLabel>
                {/* <StatNumber>{FormatCurreny(total?.Total ?? 0)}</StatNumber> */}
                {/* <StatHelpText>{getDate()}</StatHelpText> */}
              </Stat>
            </VStack>
            <Flex gap={2}>
              <IconButton
                isRound
                variant="outline"
                aria-label="Ver Detalles"
                icon={<RiEyeLine />}
                // onClick={onOpenConfigModal}
              />
              <IconButton
                isRound
                variant="outline"
                aria-label="Config"
                icon={<RiSettings3Line />}
                // onClick={onOpenConfigModal}
              />
            </Flex>
          </HStack>
        </CardHeader>
        <CardBody>
          {/* <Flex justify="flex-start" align="center" marginBottom={2}>
            <Button
              leftIcon={<RiAddCircleLine />}
              onClick={onOpenModal}
              size="sm"
              colorScheme="blue"
            >
              Agregar
            </Button>
          </Flex> */}
          {/* <Box>
            {resume.length > 0 && (
              <Quicktable
                headers={headers}
                data={resume}
                keyTable={category.Name}
              />
            )}
          </Box> */}
        </CardBody>
      </Card>
    </>
  )
}

export default Accounts