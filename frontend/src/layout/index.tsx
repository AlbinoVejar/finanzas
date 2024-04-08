import { Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'
import { UserState } from '../context/userState'
import { useRecoilState } from 'recoil'
import Toolbar from './toolbar'

const Layout = () => {
  const [userState, setUserState] = useRecoilState(UserState);
  useEffect(() => {
    setUserState({...userState, idUser: 1});
  }, []);
  return (
    <Grid
      templateAreas={`"header header"
    "main main"`}
      gridTemplateRows={'5% 1fr'}
      gridTemplateColumns={'20% 1fr'}
      height="100vh"
      gap="1"
      backgroundColor="ghostwhite"
    >
      <Navbar />
      <MainContent>
      <Toolbar />
        <Outlet />
      </MainContent>
    </Grid>
  )
}

export default Layout