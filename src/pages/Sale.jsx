import ProductList from '../components/UI/ProductList'
import { useState, useEffect } from 'react'
import Clock from '../components/UI/Clock'
import { Link } from 'react-router-dom'
import countdown_img from "../assets/images/surface2.jpeg"
import useGetData from '../custom_hooks/useGetData'




const Sale = () => {
      const {data: products,loading} = useGetData("products")

    const [saleProducts, setsaleProducts] = useState([])



  useEffect(()=>{
    const filteredSaleProducts = products.filter(item=> item.label=== "sale")
    setsaleProducts(filteredSaleProducts)
  },[products]) 
  return (
    <div className="new_releases_page">
       <section className="timer__count">
        <div className="clock__top-content">
          <h2>Limted Offer!!!</h2>
          <Clock/>
          <button className="buy_btn"><Link to="../shop/0lNUDTCR6Z55MBesY7TX"><span>Visit Offer</span></Link></button>
        </div>
        <div className="clock__product">
        <img src={countdown_img } alt=""/>
        </div>
        
      </section>
      <h2 className="section__title">Products on Sale</h2>
      
      {loading? <div className="custom-loader"></div>:
      <ProductList data={saleProducts}/> 
    }
      
      
    </div>
  )
}

export default Sale
