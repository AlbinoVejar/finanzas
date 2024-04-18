import { Grid } from '@chakra-ui/react'
import { useEffect } from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'
import { UserState } from '../context/userState'
import { useRecoilState } from 'recoil'
import daysjs from 'dayjs'
import Toolbar from './toolbar'

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
      "toolbar toolbar"
    "main main"`}
      gridTemplateRows={'4% 4% 1fr'}
      gridTemplateColumns={'1fr'}
      height="100vh"
      gap="1"
      backgroundColor="ghostwhite"
    >
      <Navbar />
      <Toolbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </Grid>
  )
}

export default Layout
