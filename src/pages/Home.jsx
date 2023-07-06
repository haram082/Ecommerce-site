import { useState, useEffect } from 'react'
import heroImg from "../assets/images/hero_img.png"
import "./styles/home.css"
import { Link, NavLink } from 'react-router-dom'

import ProductList from '../components/UI/ProductList'
import useGetData from '../custom_hooks/useGetData'


const Home = () => {
  const {data: products, loading} = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([])
  const [saleProducts, setsaleProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])


  useEffect(()=>{
    const filteredTrendingProducts = products.filter(item=> item.label=== "hot")
    setTrendingProducts(filteredTrendingProducts)

    const filteredSaleProducts = products.filter(item=> item.label=== "sale")
    setsaleProducts(filteredSaleProducts.slice(0, 4))

    const filteredNewProducts = products.filter(item=> item.label=== "new")
    setNewProducts(filteredNewProducts.slice(0, 4))
  },[products]) 
  return (
    <>
      <section className="hero__section">
              <div className="hero__content">
                <p className="hero__subtitle">"Transforming the Way You Shop Online."</p>
                <h2>Welcome to Haram's Shop</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt facilis ipsa ipsam numquam hic, iusto voluptatibus praesentium quam quod blanditiis.</p>
                <span className='learn_more'><NavLink to="../about">Click Here to Learn More... </NavLink></span>
                <NavLink to="../shop"><button className="buy_button">Shop now<i className="fa fa-shopping-cart" aria-hidden="true"></i></button> </NavLink>
              </div>
      
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
      </section>

       <section className="trending__products">
                  <h2 className="section__title">Top Trending Products</h2>
                  {
        loading? <div className="custom-loader"></div>:
        <ProductList data={trendingProducts}/> 
                  }
                  
      </section>

      <section className="best__sales">
                <h2 className="section__title">Products on Sale</h2>
                {
        loading? <div className="custom-loader"></div>:
        <><ProductList data={saleProducts}/> 
        <span className='learn_more mx-5'><Link to="../sale">See Full List....</Link></span></>
                  }
      </section>

      <section className="new__releases">
              <h2 className="section__title">New Products</h2>
              {
        loading? <div className="custom-loader"></div>:
        <><ProductList data={newProducts}/> 
        <span className='learn_more mx-5'><Link to="../newshop">See Full List....</Link></span></>
                  }
      </section>
      </>

  )
}

export default Home
