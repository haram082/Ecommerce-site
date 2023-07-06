import React from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Routers from "../../routers/Routers"
import { useEffect } from 'react'
import AdminNav from '../../Admin/AdminNav'
import { useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  useEffect(()=>{
      window.scrollTo({top:0, behavior:"smooth"})
  }, [location])
  return (
    <>{
      location.pathname.startsWith("/dashboard") ? <AdminNav/> : <Header/>
    }
    
        <Routers/>

    <Footer/>
    </>
  )
}

export default Layout
