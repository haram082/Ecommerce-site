import React, { useState } from 'react'
import {Form, FormGroup} from "reactstrap"
import "../pages/styles/addproduct.css"
import { toast } from 'react-toastify'
import {db, storage} from "../firebase.config"
import { collection } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'

const AddProduct = () => {
  const [enterTitle, setEnterTitle] = useState("")
  const [enterShortDesc, setEnterShortDesc] = useState("")
  const [enterDescription, setEnterDescription] = useState("")
  const [enterPrice, setEnterPrice] = useState("")
  const [enterCategory, setEnterCategory] = useState("")
  const [enterStock, setEnterStock] = useState("")
  const [enterLabel, setEnterLabel] = useState("")
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = async(e)=>{
    e.preventDefault()
    setLoading(true)

    try{
      const storageRef=  ref(storage, `products/${Date.now()+enterProductImg.name}`)
      await uploadBytesResumable(storageRef, enterProductImg)
      const downloadURL = await getDownloadURL(storageRef)
      await addDoc(collection(db,'products'), {
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        price: enterPrice,
        category: enterCategory,
        stock: enterStock,
        label: enterLabel,
        imgUrl: downloadURL,
        reviews: [],
        })
      
      
      toast.success("Product added")
      setLoading(false)
      navigate("/dashboard/all-products")
    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }
  return (
    <section className='p-0 tan'>
      {
        loading? <div className="custom-loader"></div>:
        <Form className='billing_form_admin' onSubmit={addProduct}>
      <h4 className='fw-bold'>Add Product</h4>
        <FormGroup className='add_form__group'>
          <span>Product Title </span>
          <input type="text" value={enterTitle}  onChange={e=>setEnterTitle(e.target.value)} required/>
        </FormGroup>

        <FormGroup className='add_form__group'>
          <span>Category </span>
          <select value={enterCategory}  onChange={e=>setEnterCategory(e.target.value)} required>
          <option>Select</option>
          <option value="bathroom">Bathroom</option>
            <option value="furniture">Furniture</option>
            <option value="kitchen">Kitchen</option>
            <option value="laptop">Laptop</option>
            <option value="mobile">Mobile</option>
          </select>
        </FormGroup>

        <FormGroup className='add_form__group'>
          <span>Label </span>
          <select value={enterLabel}  onChange={e=>setEnterLabel(e.target.value)} required>
          <option value="none">none</option>
            <option value="hot">Hot!</option>
            <option value="sale">Sale!</option>
            <option value="new">New!</option>
          </select>
        </FormGroup>

        <FormGroup className='add_form__group'>
          <span>Short Description</span>
          <input type="text"  value={enterShortDesc}  onChange={e=>setEnterShortDesc(e.target.value)} required/>
        </FormGroup>

        <FormGroup className='add_form__group'>
          <span>Description</span>
          <textarea rows={5} type="text"  value={enterDescription}  onChange={e=>setEnterDescription(e.target.value)} required/>
        </FormGroup>
        <div className='d-flex justify-content-between small_input'><FormGroup className='add_form__group'>
          <span className='mx-4'>Price</span>
          <span>$ <input type="number"  value={enterPrice}  onChange={e=>setEnterPrice(e.target.value)} required/></span>
        </FormGroup>
        <FormGroup className='add_form__group'>
          <span> Stock Quant</span>
          <input type="number"  value={enterStock}  onChange={e=>setEnterStock(e.target.value)} required/>
        </FormGroup>
        <FormGroup className='add_form__group'>
          <span>Product Img  </span>
          <input type="file"   className="text-warning"onChange={e=> setEnterProductImg(e.target.files[0])} required />
        </FormGroup>
        
        </div>
        

       

        <button className="add-button" type="submit">Add Product</button>
      </Form>
      }
      
    </section>
  )
}

export default AddProduct
