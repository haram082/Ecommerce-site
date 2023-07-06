import React from 'react'
import useAuth from '../custom_hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const ProtectedRouters = () => {
    const {currentUser} = useAuth()

  return (
    currentUser  ? <Outlet/> : <Navigate to="../login"/>
  )
}

export default ProtectedRouters
