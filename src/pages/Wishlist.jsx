import React from 'react'
import CommonSection from '../components/UI/CommonSection'
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import useGetData from '../custom_hooks/useGetData'
import useAuth from '../custom_hooks/useAuth'



const Wishlist = () => {
    const {currentUser} =useAuth()
     const {data: wishlist,loading} = useGetData(`users/${currentUser.uid}/wishlist`)


  return (
    <>
    <CommonSection title="Wishlist"></CommonSection>
    <div className='cart d-flex'>
      
    {wishlist.length === 0 ? (
    <h2 className='text-center p-5'>No Items in Wishlist<br/><Link to="../shop"><span className='continue_shopping'>Continue Shopping...</span></Link></h2>) :
    (
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
      wishlist?.map((item, index)=>(
          <Tr item={item} key={index}/>
        ))}
      </tbody>
    </table>
    )}
    </div>
    </>
  )
}

const Tr = ({item}) => {
  const {currentUser} =useAuth()
  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/wishlist`, id))
  }
    return (
      <tr>
      <td><Link to={`../shop/${item.id}`}> <img src={item.imgUrl} alt="" /></Link></td>
      <td> <Link to={`../shop/${item.id}`}>{item.productName}</Link> </td>
      <td> ${item.price}</td>
      <td onClick={()=>deleteProduct(item.id)}><i class="fa fa-trash-o" aria-hidden="true"></i></td>
    </tr>
        
    )
  }

export default Wishlist

