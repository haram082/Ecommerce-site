import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductList from '../components/UI/ProductList'
import { useState, useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { cartActions } from '../redux/cartSlice'
import { toast } from "react-toastify"
import ReviewForm from './ReviewForm'
import "./styles/productdetails.css"

import useGetData from '../custom_hooks/useGetData'
import { doc, getDoc, collection, deleteDoc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'
import useAuth from '../custom_hooks/useAuth'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const ProductDetails = () => {
  const {data: products, loading} = useGetData("products")
  const [product, setProduct] = useState({})

  const {currentUser} = useAuth() 
  const{id} =useParams()
  
  useEffect(()=>{
    const getProduct =async()=>{
      const docSnap = await getDoc(doc(db, "products", id))
      
      if(docSnap.exists()){
        setProduct(docSnap.data())
      }
    }
    getProduct()
  },[id])
  const {imgUrl, productName,price, description, shortDesc, stock, category }= product
  const tax= price*0.0725

  const navigate = useNavigate
  const quantity = useRef(1)
  const addtoFirestore =async()=>{
    if (currentUser){
      const quant = quantity.current.value
    for (let i = 0; i < quant; i++) {
     await setDoc(doc(db,`users/${currentUser.uid}/cart`, id ),product )
    }
    toast.success("Product added")
  }else{
    navigate("login")
  }

  }

  const [relatedProducts, setRelatedproducts] = useState([])
  const[addReview, setAddReview] = useState(false)
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(5)
  
  
  useEffect(() => {
    const getReviews = async () => {
      const prodReviews = await getDocs(collection(db, `products/${id}/reviews`));
      const reviewsData = prodReviews.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setReviews(reviewsData);
      const ratings = reviewsData.map((review) => review.rating);
      const sum = ratings.reduce((acc, curr) => acc + curr, 0);
      const avg = (sum / ratings.length).toFixed(2);
      setAvgRating(avg);
    };
    getReviews();
  }, [id]);



  // const dispatch = useDispatch()

//   const addtoCart =()=>{
//     const quant = quantity.current.value
//     for (let i = 0; i < quant; i++) {
//       dispatch(cartActions.addItem({
//         id,
//         imgUrl: imgUrl,
//         productName,
//         price
//       }))}
//     toast.success("Produce Added!")
// }


 useEffect(()=>{
    const related = products.filter(item=> item.category=== category && item.id !== id)
    setRelatedproducts(related)
  },[products, category, id]) 

  const [wished, setWished] = useState(false)
  useEffect(()=>{
    if(currentUser){
    const checkWished = async()=>{
      const docSnap = await getDoc(doc(db, `users/${currentUser.uid}/wishlist`, id))
      if(docSnap.exists()){
        setWished(true)
      }else{
        setWished(false)
      }
    }
    checkWished()
  }
  })
    
  const handlewished =async()=>{
    if(currentUser){
          if(wished){
            await deleteDoc(doc(db, `users/${currentUser.uid}/wishlist`, id))
          }else{
            await setDoc(doc(db,`users/${currentUser.uid}/wishlist`, id ),product )
            toast.success("Product Wished!")
        }
      }
  }

  const payment = async(token) => {
    const data = {
      amount: parseInt(price) * 100 + parseInt(tax) * 100,
      token: token,
    };
    await axios.post("http://localhost:8000/pay", data)
    .then(toast.success("Payment Successful"))
    .catch((err)=>toast.error(err))
  };
  
  
  return (
    <>
    {loading ? <div className="custom-loader"></div> :
    <>
    <section className="pd_container p-3">
        <div className="prod_image"><img src={imgUrl} alt="" />
        <span onClick={handlewished} className={wished ? "added_wishlist pd_wishlist" : "add_wishlist pd_wishlist"}><i className="fa fa-heart" aria-hidden="true"/></span>
        </div>
        <div className="product_details p-3">
          <h3>{productName}</h3>
          <h6>{shortDesc}</h6>
          <h4>${price}</h4>
          <p> <span className='text-warning'>{"★".repeat(avgRating)}</span>{"★".repeat(5-avgRating)} <br /> Average Rating: {avgRating} </p>
          <p>{description} </p>
          <p className='text-danger'>{stock} left in Stock !!!</p>
          <span>Quantity: <input type="number" className="quantity" min="1" max="99" defaultValue={1} ref={quantity}/> </span>
          <div className="buttons d-flex gap-3 py-3">
          <button className="add_to_cart" onClick={addtoFirestore}>
          <span className="button__text">Add To Cart</span>
          <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
     {currentUser ? <StripeCheckout
        stripeKey='pk_test_51NQhHmCsJIIWTEMRtnNDXyd5AVsBF87mIYsAxOAWA1RfwojbcY2KcV3iVlHdmJzrcaEe90me4Mco70qxeHbL6PzV00ZFoeonD8'
        name='Haram Shop'
        amount={(parseInt(price) * 100 +tax*100).toFixed(2)}
        description={`Your Total plus Tax is $${(parseInt(price)+ tax ).toFixed(2) }`}
        token= {payment}
        email = {currentUser.email}
        shippingAddress
        billingAddress={false}>          
        <button className='buy_now'>Buy Now</button>
          </StripeCheckout>: <button className='buy_now' onClick={()=>navigate("../login")}>Buy Now</button>}
          </div>
        
          </div>
     </section>
    <section className="related_prod">
      <h3 className="section__title text-white">Related Products</h3>
      <ProductList data={relatedProducts}/>

    </section>
    <section className="reviews">
                <h4 className="section__title text-black">Reviews  </h4>
                <ul className="prod_reviews">
                    {
                      reviews.map((item, index)=>(
                        <li className='review' key={index}> <p>{item.userName}</p><span>{"★".repeat(item.rating)} <p className='review_header'>{item.header}</p></span>
                        <p>{item.text}</p></li> 
                      ))
                    }
                </ul> 
                <button  className="add_review_button "onClick={()=>setAddReview(!addReview)}>{addReview ? "Exit Review":"Leave a Review ⬇️"}</button>
                    
                  
               {addReview && <ReviewForm id={id}/>}                 
        </section>
    </>}
    </>
  )
}





export default ProductDetails
