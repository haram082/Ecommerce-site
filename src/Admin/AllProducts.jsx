import {useState} from 'react'
import useGetData from '../custom_hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const AllProducts = () => {
  const {data: productsData, loading} = useGetData("products")
  const [products, setProducts] = useState(productsData)
  const handleFilter = (e)=>{
      const filtervalue= e.target.value
      if(filtervalue === "all"){
        setProducts(productsData)
      }else{
        const filteredProducts = productsData.filter(item => item.category === filtervalue)
        setProducts(filteredProducts)
      }   
  }

  const handleSearch  = e => {
    const searchItem =  e.target.value
    const searchedProducts  = productsData.filter(item => item.productName.toLowerCase().includes(searchItem.toLowerCase()))
    setProducts(searchedProducts) 
  }
  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, "products", id))
    toast.success("Deleted")
  } 
  
  return (
    <><h4 className='fw-bold '> Products ({products.length})</h4>
    <div className='d-flex gap-4'>
       <div className='input-container'>
            <input type="text" name="text" className="input" placeholder="search..." onChange={handleSearch}/>
                <span className="icon"> 
                  <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </span>
                </div>
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
              </div>
   <table className='table'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {loading ? <div className="custom-loader"></div> :
          products?.map(item => (
            <tr key={item.id}>
              <td><img src={item.imgUrl} alt={item.name} /></td>
              <td>{item.productName}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
              <td onClick={() => { deleteProduct(item.id) } }><i className="fa fa-trash-o" aria-hidden="true"></i></td>
            </tr>
          ))}

      </tbody>

    </table></>
  )
}

export default AllProducts
