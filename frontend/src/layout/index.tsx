import { Grid } from '@chakra-ui/react'
import React from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Grid
      templateAreas={`"header header"
    "main main"`}
      gridTemplateRows={'5% 1fr'}
      gridTemplateColumns={'20% 1fr'}
      height="100vh"
      gap="0.5"
    >
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </Grid>
  )
}

export default Layout