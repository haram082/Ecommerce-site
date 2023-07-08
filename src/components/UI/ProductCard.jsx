import { useState, useEffect } from "react"
import "../../pages/styles/card.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from "react-redux"
// import { cartActions } from "../../redux/cartSlice"
import { db } from "../../firebase.config";
import { collection,addDoc, setDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import useAuth from "../../custom_hooks/useAuth"

const ProductCard = ({item}) => {
    // const dispatch = useDispatch()
    // const addToCart = ()=>{
    //   dispatch(cartActions.addItem({
    //     id: item.id,
    //     productName: item.productName,
    //     price: item.price,
    //     imgUrl: item.imgUrl
    //         }))
    //   toast.success("Product added! ")
    // }

    const {currentUser} = useAuth()
    const navigate = useNavigate()
    const addtoFirestore =(async()=>{
      if (currentUser){
        await setDoc(doc(db,`users/${currentUser.uid}/cart`, item.id ),item )
      toast.success("Product added")
      }else{
        navigate("login")
      }
    })

    const [added, setadded] = useState(false)
    useEffect(() => {
        if (added) {
          setTimeout(() => {
            setadded(false);
          }, 3000);
        }
      }, [added]);


      const [wished, setWished] = useState(false)
      useEffect(()=>{
        if(currentUser){
        const checkWished = async()=>{
          const docSnap = await getDoc(doc(db, `users/${currentUser.uid}/wishlist`, item.id))
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
                await deleteDoc(doc(db, `users/${currentUser.uid}/wishlist`, item.id))
              }else{
                await setDoc(doc(db,`users/${currentUser.uid}/wishlist`, item.id ),item )
                toast.success("Product Wished!")
            }
          }
      }
    
  return (
    <div className="product__item">
        <div className="card">
          {item.label !== "" && <span className="label">{item.label}</span>}
          <span  onClick={handlewished} className={wished ? "added_wishlist" : "add_wishlist"}><i className="fa fa-heart" aria-hidden="true"/></span>
            <Link to={`../shop/${item.id}`}><div className="image"><img src={item.imgUrl} alt="" /></div></Link>
          <span className="title">{item.productName}</span>
            <span className="price">${item.price}</span>
            <button className='card_button' onClick={()=>{addtoFirestore() ;setadded(!added)}}>{added ? "Added!" : "Add to Cart"}</button>
    </div>
    </div>
  )
}
export default ProductCard


