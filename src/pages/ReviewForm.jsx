import {useRef, useState} from 'react'
import { toast } from 'react-toastify'
import {  collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import useAuth from '../custom_hooks/useAuth'


const ReviewForm = ({id}) => {

    const [rating, setRating] = useState(null)
     const {currentUser} = useAuth() 
    const reviewUser = useRef("")
    const reviewMsg = useRef("")
    const reviewHead = useRef("")
    const submitHandler= async(e) =>{
        e.preventDefault()
        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value
        const reviewUserHead = reviewHead.current.value
        if(currentUser){
          await addDoc(collection(db,  `products/${id}/reviews`), {
            userName: reviewUserName,
            header: reviewUserHead,
            text: reviewUserMsg,  
            rating: rating
          })
        toast.success("Review Submitted")
        window.location.reload()
        window.scrollTo({top:0, behavior:"smooth"})
        }else{
          toast.error("No Account Found")
        }
        

    }
    
  return (
    
    <div className="review__form">
        <div className="top">
                <h4>Leave a Review Down Here</h4>
        </div>
                  <form action="" onSubmit={submitHandler}>
                  <input type="text" name="rate_text" id="name" placeholder='Enter Name...' ref={reviewUser} required/>
                  <span className ="rating">
                    <input type="radio" id="star5" name="rate" value="5"  onClick={()=> setRating(5)}/>
                    <label htmlFor="star5" title="text"></label>
                    <input type="radio" id="star4" name="rate" value="4" onClick={()=> setRating(4)}/>
                    <label htmlFor="star4" title="text"></label>
                    <input type="radio" id="star3" name="rate" value="3" onClick={()=> setRating(3)}/>
                    <label htmlFor="star3" title="text"></label>
                    <input type="radio" id="star2" name="rate" value="2"onClick={()=> setRating(2)}/>
                    <label htmlFor="star2" title="text"></label>
                    <input type="radio" id="star1" name="rate" value="1" onClick={()=> setRating(1)}/>
                    <label htmlFor="star1" title="text"></label>
                    </span>
                  <input type="text" name="rate_text" id="header_text" placeholder='Headline' ref={reviewHead} required/>
                  <textarea rows={5} type="text" name="rate_text" id="body_text" placeholder='Description' ref={reviewMsg} required/>
                  <button  type="submit" className="submit">Submit</button>
                  </form>
                </div>
  )
}


export default ReviewForm
