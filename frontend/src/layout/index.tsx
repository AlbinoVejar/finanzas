import { Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'
import { UserState } from '../context/userState'
import { useRecoilState } from 'recoil'
import Toolbar from './toolbar'
import * as daysjs from 'dayjs'

const Layout = () => {
  const [userState, setUserState] = useRecoilState(UserState)
  useEffect(() => {
    setUserState({
      ...userState,
      idUser: 1,
      Init_date: daysjs().startOf('month').format('YYYY-MM-DD'),
      End_date: daysjs().endOf('month').format('YYYY-MM-DD'),
    })
  }, [])
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
