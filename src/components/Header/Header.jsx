import "./header.css" 
import { NavLink } from 'react-router-dom'
import logo from "../../assets/images/eco-logo.png"
import {Navbar, NavbarToggler, Collapse, Nav, NavbarBrand, NavItem} from "reactstrap";
import { useRef, useEffect, useState } from "react";
import { db } from '../../firebase.config'
import { collection, onSnapshot, getDoc, doc } from 'firebase/firestore'
// import { useSelector } from "react-redux";
import useAuth from "../../custom_hooks/useAuth";
import { signOut } from "firebase/auth";
import {toast} from "react-toastify"
import { auth } from "../../firebase.config";

const nav__links =[
  {
    path: "home",
    display: "Home"
  },{
    path: "shop",
    display: "Shop"
  },{
    path: "NewShop",
    display: "What's New"
  },{
    path: "Sale",
    display: "Sale"
  },
  {
    path: "about",
    display: "About Us"
  }
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef("null")
  // const totalQuantity = useSelector(state=> state.cart.totalQuantity)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const[admin, setAdmin] = useState(false)

  const { currentUser } = useAuth()
  

  useEffect(()=>{
    if(currentUser){
        const getData = async()=>{
            await onSnapshot(collection(db, `users/${currentUser.uid}/cart`), snapshot=>{
                setCart(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})))
            })
            await onSnapshot(collection(db, `users/${currentUser.uid}/wishlist`), snapshot=>{
              setWishlist(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})))
          })
           const docsnap = await getDoc(doc(db, `users/${currentUser.uid}`))
            setAdmin(docsnap.data().admin)
        }
        getData()
    }
  },[currentUser])

  const logout =()=>{
    signOut(auth).then(()=>{
      toast.success("Logged Out")
      setAdmin(false)
      setCart([])
      setWishlist([])
    }).catch(err=>{
      toast.error(err.message)
    })
  }
  

  const stickyHeaderFunc = () =>{
    window.addEventListener("scroll", ()=>{
      if(
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ){
        headerRef.current.classList.add("sticky_head")
      }else{
        headerRef.current.classList.remove("sticky_head")
      }
    })}
    useEffect(()=>{
      stickyHeaderFunc()
      return ()=> window.removeEventListener("scroll", stickyHeaderFunc)
    })

  return (
    <header className="header" ref={headerRef}>
      <Navbar expand="lg">  
      <NavbarBrand to="home">
      <div className="logo">
          <NavLink to="home" onClick={()=>setIsOpen(!isOpen)} > <img src={logo} alt="logo"/></NavLink>
       
            </div>
           
      </NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
              <Nav className="menu">
                {
                  nav__links.map((item, index)=>(
                     <NavItem className="nav__item" key={index}>
                      <NavLink to={item.path}  onClick={()=>setIsOpen(!isOpen)} className={(navClass)=>navClass.isActive
                       ? 'nav__active' : ""}>{item.display}</NavLink>
                     </NavItem>
                  ))
                }
                  {/*nav icons */}
                  <NavItem className="nav__icons">
                              {admin && <span className="login-text text-danger"> <NavLink to="/dashboard">Dashboard</NavLink></span>}
                            <span className="login_icon main"> <NavLink to={currentUser === null && "login"} onClick={()=>setIsOpen(!isOpen)}>{currentUser ? <img src={currentUser.photoURL} alt=""/>: <span> 
                            <span className="login-text">LOGIN/SIGNUP </span><i className="fa fa-user-circle-o" aria-hidden="true"> </i> </span>}
                            {currentUser &&
                            <div className="dropdown-content">
                                <NavLink to="orders">Orders</NavLink>
                                <NavLink to="/login" onClick={logout}>Sign Out</NavLink>
                              </div>}
                            </NavLink></span>
                            <span className="wishlist_icon"><NavLink to="wishlist" onClick={()=>setIsOpen(!isOpen)}><i className="fa fa-heart" aria-hidden="true"></i></NavLink>
                            <span className="badge">{wishlist.length}</span>
                            </span>
 
                            <span className="cart_icon"><NavLink to="cart" onClick={()=>setIsOpen(!isOpen)}><i className="fa fa-cart-plus" aria-hidden="true"></i><span className="badge">{cart.length}</span></NavLink>
                            </span>
                          </NavItem>
                        </Nav>
                        </Collapse>
             </Navbar>
     
        
          </header>
  )
}

export default Header
