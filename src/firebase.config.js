

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDgyJrb-t4Drym6RV_dn4rdlUtxB1-12C0",
  authDomain: "haram-s-shop.firebaseapp.com",
  projectId: "haram-s-shop",
  storageBucket: "haram-s-shop.appspot.com",
  messagingSenderId: "105230530383",
  appId: "1:105230530383:web:b570c66f9e83bc5106773a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app