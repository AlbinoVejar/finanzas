import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LandingLayout = () => {
  return (
    <Container height="100vh" width="100%" centerContent justifyContent="center">
      <Outlet />
    </Container>
  )
}

export default LandingLayout