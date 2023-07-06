import React from 'react'
import "../../pages/styles/card.css"
import ProductCard from './ProductCard'



const ProductList = ({data, id}) => {
  return (
    <div className='Products'>
      {
        data.map(item=>(
          <ProductCard item={item} key={id}/>
        ))
      }
   
      
    </div>
  )
}

export default ProductList
