import React from 'react'
import NavBar from '../components/user/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/Footer'

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main className='container mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
