import { Grid } from '@chakra-ui/react'
import { useEffect } from 'react'
import MainContent from './content'
import Navbar from './navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserSelector } from '../../context/userState'
import { useRecoilValue } from 'recoil'

const AppLayout = () => {
  const {token} = useRecoilValue(UserSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if(!Boolean(token)){
      navigate('/login')
    }
  }, [token]);

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
