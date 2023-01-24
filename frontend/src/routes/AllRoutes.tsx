import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Editor from '../pages/Editor'

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/editor/id' element={<Editor></Editor>} />
    </Routes>
  )
}
