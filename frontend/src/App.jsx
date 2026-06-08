import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './page/Home'
import RedirectPage from './page/RedirectPage'
import Dashboard from './page/Dashboard'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/:shortLink" element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
