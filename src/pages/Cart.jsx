
import "./styles/cart.css"
import CommonSection from "../components/UI/CommonSection"
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import {cartActions} from "../redux/cartSlice"
// import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import useGetData from '../custom_hooks/useGetData'
import useAuth from '../custom_hooks/useAuth'
import { toast } from "react-toastify"



const Cart = () => { 
  const {currentUser} =useAuth()
  const navigate= useNavigate()
  const {data: cart,loading} = useGetData(`users/${currentUser.uid}/cart`)

  
  const addOrder = () => {
    for (const item of cart){
      setDoc(doc(db, `users/${currentUser.uid}/orders`, item.id), item)
    }
  }
  
  const emptyCart = () => {
    for (const item of cart) {
       deleteDoc(doc(db, `users/${currentUser.uid}/cart`, item.id))
    }
  }

  const totalCost = cart.reduce((accumulator, currentObject) => {
    return accumulator + Number(currentObject.price);
  }, 0)
  const tax= totalCost*0.0725

  const payment = async(token) => {
    const data = {
      amount: parseInt(totalCost * 100 + tax*100),
      token: token,
    };
    await axios.post("http://localhost:8000/pay", data)
    .then(addOrder())
    .then(emptyCart())
    .then(toast.success("Payment Successful"))
    .then(navigate("../orders"))
    .catch((err) =>toast.error("Payment Failed"));
  };

  // const cartItems = useSelector(state=> state.cart.cartItems)
  // const totalAmount = useSelector(state=>state.cart.totalAmount)

  return (
    <>
    <CommonSection title="Cart"></CommonSection>
    <div className='cart d-flex'>
    {cart.length === 0 ? (
    <h2 className='text-center p-5'>No Items in Cart :(<br/><Link to="../shop"><span className='continue_shopping'>Continue Shopping...</span></Link></h2>) :
    (
      <>
    <table className="table bordered">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>  
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {loading ? <div className="custom-loader"></div> :
        cart?.map((item, index)=>(
          <Tr item={item} key={index}/>
        ))}
      </tbody>
    </table>
    <div className='checkout__cart'>
    <h6>Total Qty: <span>{cart.length} Items</span></h6>
      <h6>Subtotal <span className='fw-bold'>${totalCost}</span></h6>
    <h6>Tax: <span>${tax.toFixed(2)}</span></h6>
    <h6><span>Shipping: <br/>Free Shipping</span><span>$0</span> </h6>
      <h4>Total Cost: <span>${(totalCost+ tax).toFixed(2)  }</span></h4>
      <p className='text-danger'>We do not accept Returns</p>
      <button className="buy_btn w-100"><Link to="../shop"><span>Continue Shopping</span></Link></button>
      <div>
          <StripeCheckout
          stripeKey='pk_test_51NQhHmCsJIIWTEMRtnNDXyd5AVsBF87mIYsAxOAWA1RfwojbcY2KcV3iVlHdmJzrcaEe90me4Mco70qxeHbL6PzV00ZFoeonD8'
          name='Haram Shop'
          amount={parseInt(totalCost * 100 + tax*100)}
          description={`Your Total is $${(totalCost+ tax).toFixed(2) }`}
          token= {payment}
          email = {currentUser.email}
          shippingAddress
          billingAddress={false}>
          <button className='buy_btn w-100'><span>Proceed to Checkout</span></button>
            </StripeCheckout>
                </div>

    </div>
    </>)}
    </div>
    </>
  )
}

const Tr = ({item}) => {
  // const dispatch = useDispatch()

  // const deleteProduct = ()=>{
  //   dispatch(cartActions.deleteItem(item.id))
  // }
  const {currentUser} =useAuth()
  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/cart`, id))
  } 
  return (
    <tr>
    <td><Link to={`../shop/${item.id}`}> <img src={item.imgUrl} alt="" /></Link></td>
    <td> <Link to={`../shop/${item.id}`}>{item.productName}</Link> </td>
    <td> ${item.price}</td>
    <td onClick={()=>deleteProduct(item.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></td>
  </tr>
      
  )
}



export default Cart
