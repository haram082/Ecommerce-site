import React from 'react'
import ProductList from '../components/UI/ProductList'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { useState } from 'react'
import "../pages/styles/shop.css"
import useGetData from '../custom_hooks/useGetData'


const Shop = () => {
    const {data: products, loading} = useGetData('products')
  const [productsData, setProductsData] = useState(products)
  

  const handleFilter = (e)=>{
      const filtervalue= e.target.value
      if(filtervalue === "all"){
        setProductsData(products)
      }else{
        const filteredProducts = products.filter(item => item.category === filtervalue)
        setProductsData(filteredProducts)
      }   
  }

  const handleSearch  = e => {
    const searchItem =  e.target.value
    const searchedProducts  = products.filter(item => item.productName.toLowerCase().includes(searchItem.toLowerCase()))
    setProductsData(searchedProducts)
  }

  return (
    <div className="new_releases_page">
      <CommonSection title="Products"></CommonSection>
    
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className='input-container'>
            <input type="text" name="text" className="input" placeholder="search..." onChange={handleSearch}/>
                <span className="icon"> 
                  <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </span>
                </div>
            </Col>
            <Col lg="2" md="3">
              <div className="filter__widget">
                <select onClick={handleFilter}>
                <option value="all">Press to  Show All Products</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="furniture">Furniture</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="laptop">Laptop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
      {
        loading? <div className="custom-loader"></div>:
        
      <ProductList data={productsData}/> 
        
      }
     

    </div>
  )
}

export default Shop
