import { Box, Container, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserSelector } from '../../context/userState'
import { useRecoilValue } from 'recoil'

const LandingLayout = () => {
  const {token} = useRecoilValue(UserSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if(Boolean(token)){
      navigate('/app')
    }
  }, [token])

  return (
    <Container height="100vh" width="100%" centerContent justifyContent="center">
      <Outlet />
    </Container>
  )
}

export default LandingLayout