import { Routes, Route } from 'react-router-dom'
import {AppLayout, LandingLayout} from '../layout'
import Dashboard from '../pages/dashboard'
import Accounts from '../pages/accounts'
import Login from '../static/login'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />} >
        {/* <Route path='categorias' element={<CategoriesDashboard />} /> */}
        <Route index element={<Dashboard />} />
        <Route path='cuenta/:id' element={<Accounts />} />
      </Route>
      <Route path="/" element={<LandingLayout />} >
        <Route index path='login' element={<Login/>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
