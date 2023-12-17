import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../layout'
import Dashboard from '../pages/dashboard'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
