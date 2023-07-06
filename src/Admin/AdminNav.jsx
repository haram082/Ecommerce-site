import React from 'react'
import useAuth from '../custom_hooks/useAuth'
import logo from "../assets/images/eco-logo.png"
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import "../pages/styles/admin-nav.css"
import {toast} from "react-toastify"


const admin__nav=[{
    display: "Dashboard",
    path: "/dashboard",
},{
    display: "All Products",
    path: "/dashboard/all-products",
},{
    display: "Add Product",
    path: "/dashboard/add-products",
},{
    display: "Users",
    path: "/dashboard/users",
}
]

const AdminNav = () => {
    const {currentUser} = useAuth()
  const logout =()=>{
    signOut(auth).then(()=>{
      toast.success("Logged Out")
    }).catch(err=>{
      toast.error(err.message)
    })
  }
  return (
    <><header className="admin__header">
          <div className="admin__nav-top">

              <div className="admin__nav-wrapper-top">
                  <div className="logo"><NavLink to="home">
                  <img src={logo} alt="logo" />
                      <h2>Haram's Shop</h2>
                  </NavLink>
                      
                  </div>

                  <div className='input-container'>
                      <input type="text" name="text" className="input" placeholder="search..." />
                      <span className="icon">
                          <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </span>
                  </div>

                  <div className="admin__nav-top-right">
                      
                     <span className='login_icon'><img src={currentUser.photoURL} alt="" />
                     <div className="dropdown-content">
                                <NavLink to="home">Customer View</NavLink>
                                <NavLink to="/login" onClick={logout}>Sign Out</NavLink>

                              </div>
                     </span> 
                     <span><i className="fa fa-bell-o" aria-hidden="true"></i></span>
                      <span><i className="fa fa-cogs" aria-hidden="true"></i></span>
                     
                      
                  </div>

              </div>

          </div>
      </header>
      <section className="admin__menu p-0" >
            <div className="admin__navigation">
                <ul className="admin__menu-list">
                    {
                        admin__nav.map((item, index)=>(
                            <li className="admin__menu-item" key={index}><NavLink to= {item.path} className={(navClass)=>navClass.isActive
                                ? 'nav__menu-active' : ""}>{item.display}</NavLink></li>
                            
                        ))
                    }
                </ul>
            </div>
          </section></>
  )
}

export default AdminNav
