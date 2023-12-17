import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { RiSettings3Line } from '@remixicon/react'
import React from 'react'

const Dashboard = () => {
  return (
    <Card>
      <CardHeader>
        <HStack divider={<StackDivider />} gap={8}>
          <Avatar />
          <Box>
            <Heading size="md">Gastos Diarios</Heading>
            <Text>Creator, Chakra UI</Text>
          </Box>
          <Box width='100%' justifySelf='flex-end'>
            <IconButton
              isRound
              variant="outline"
              aria-label="Config"
              icon={<RiSettings3Line />}
            />
          </Box>
        </HStack>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  )
}

export default Dashboard
