import React from 'react'
import { Link } from 'react-router-dom'
import CommonSection from '../components/UI/CommonSection'
// import { db } from '../firebase.config'
import useGetData from '../custom_hooks/useGetData'
import useAuth from '../custom_hooks/useAuth'

const Orders = () => {
  const {currentUser} =useAuth()
     const {data: orders,loading} = useGetData(`users/${currentUser.uid}/orders`)


  return (
    <>
    <CommonSection title="Orders"></CommonSection>
    <div className='cart d-flex'>
    
    <table className="table bordered">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {loading ? <div className="custom-loader"></div> :
      orders?.map((item, index)=>(
          <Tr item={item} key={index}/>
        ))}
      </tbody>
    </table>
    </div>
    </>
  )
}

const Tr = ({item}) => {
    return (
      <tr>
      <td><Link to={`../shop/${item.id}`}> <img src={item.imgUrl} alt="" /></Link></td>
      <td> <Link to={`../shop/${item.id}`}>{item.productName}</Link> </td>
      <td> ${item.price}</td>
    </tr>
        
    )
  }

export default Orders
