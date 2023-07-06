import React from 'react'
import ProductList from '../components/UI/ProductList'
import { useState, useEffect } from 'react'
import CommonSection from "../components/UI/CommonSection"
import useGetData from '../custom_hooks/useGetData'

const NewShop = () => {
  const [newProducts, setNewProducts] = useState([])
  const {data: products,loading} = useGetData("products")

  useEffect(()=>{
    const filteredNewProducts = products.filter(item=> item.label=== "new")
    setNewProducts(filteredNewProducts)
  },[products]) 
  return (
    <div className="new_releases_page">
      <CommonSection title={"New Releases"}/>
      {loading? <div className="custom-loader"></div>:
      
      <ProductList data={newProducts}/> }

      
    </div>
  )
}

export default NewShop
