import React from 'react'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase.config';


const test = () => {

    const ref = db.ref('products/EKUtxvhoM6BSByfGEncQ');

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on('value', (snapshot) => {
      console.log(snapshot.val());
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    }); 
  return (
    <div>
      
    </div>
  )
}

export default test
