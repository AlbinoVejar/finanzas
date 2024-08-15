import { Grid } from '@chakra-ui/react'
import { useEffect } from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserState } from '../../context/userState'
import { useRecoilState } from 'recoil'
import daysjs from 'dayjs'

const AppLayout = () => {
  const [userState, setUserState] = useRecoilState(UserState)
  const navigate = useNavigate()
  useEffect(() => {
    setUserState({
      ...userState,
      filters: {
        init_date: daysjs().startOf('month').format('YYYY-MM-DD'),
        end_date: daysjs().endOf('month').format('YYYY-MM-DD')
      }
    })
    console.log('AFTER TOKEN', userState);
  }, [])

  useEffect(() => {
    navigate('/')
  }, [userState.token]);

  return (
    <Grid
      templateAreas={`"header header"
    "main main"`}
      gridTemplateRows={'4% 1fr'}
      gridTemplateColumns={'1fr'}
      height="100vh"
      gap="1"
      backgroundColor="ghostwhite"
    >
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </Grid>
  )
}

export default AppLayout
