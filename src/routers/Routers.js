import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import ProductDetails from "../pages/ProductDetails"
import Login from "../pages/Login"
import Signup from "../pages/SignUp"
import Sale from "../pages/Sale"
import NewShop from "../pages/NewShop"
import About from "../pages/About"
import Wishlist from "../pages/Wishlist"
import Orders from "../pages/Orders"
import ProtectedRouters from "./ProtectedRouters"
import AddProduct from "../Admin/AddProduct"
import AllProducts from "../Admin/AllProducts"
import AllUsers from "../Admin/AllUsers"
import Dashboard from "../Admin/Dashboard"
import ShopByCategory from "../pages/ShopByCategory"
import PrivacyPolicy from "../pages/PrivacyPolicy"
import TermsConditions from "../pages/TermsConditions"



const Routers = () => {
  
  return (
    <Routes>
      {/* header routes */}
      <Route path="/" element={<Navigate to="home"/>}/>  
      <Route path="home" element={<Home/>} />
      <Route path="newshop" element={<NewShop/>} />
      <Route path="sale" element={<Sale/>} />
      <Route path="shop" element={<Shop/>} />
      <Route path="shop/:id" element={<ProductDetails/>} />
      <Route path="login" element={<Login/>} />
      <Route path="about" element={<About/>} />
      <Route path="signup" element={<Signup/>} />
      <Route path="orders" element={<Orders/>} />



      {/* protected routes */}
      <Route path="/*" element={<ProtectedRouters/>}>
      <Route path="cart" element={<Cart/>} />
      <Route path="wishlist" element={<Wishlist/>} />
      <Route path="orders" element={<Orders/>} />
        <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="dashboard/all-products" element={<AllProducts/>}/>
      <Route path="dashboard/add-products" element={<AddProduct/>}/>
      <Route path="dashboard/users" element={<AllUsers/>}/>
      
      </Route>

      {/* footer routes */}
      <Route path="shop/mobile" element={<ShopByCategory category={"mobile"}/>} />
        <Route path="shop/furniture" element={<ShopByCategory category={"furniture"}/>} />
        <Route path="shop/bathroom" element={<ShopByCategory category={"bathroom"}/>} />
        <Route path="shop/laptop" element={<ShopByCategory category={"laptop"}/>} />
        <Route path="shop/kitchen" element={<ShopByCategory category={"kitchen"}/>} />
        <Route path="privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="terms-conditions" element={<TermsConditions/>} />



      </Routes>
  )
}

export default Routers
