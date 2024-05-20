import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../layout'
import Dashboard from '../pages/dashboard'
import Accounts from '../pages/accounts'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path='categorias' element={<Dashboard />} />
        {/* <Route index element={<Accounts />} /> */}
      </Route>
    </Routes>
  )
}

export default MainRouter
