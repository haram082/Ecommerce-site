import React, { useState } from 'react'
import "./styles/login.css"
import { Link } from 'react-router-dom'
import { Form, FormGroup } from 'reactstrap'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { setDoc, doc } from 'firebase/firestore'
import {auth, storage, db} from "../firebase.config"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Signup = () => {
  const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [email, setEmail] = useState('')
	const [file, setFile ] = useState("null")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	

		
	const handleSubmit = async(e) => {
		e.preventDefault()
		if (password !== repeatPassword) {
			alert("Passwords don't match");
		} else {
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password)
				const user = userCredential.user

				const storageRef = ref(storage, `images/${Date.now()+username}`)
				

				const uploadTask = uploadBytesResumable(storageRef, file)
				uploadTask.on((error)=>{
					toast.error(error.message)
				}, ()=>{
					getDownloadURL(uploadTask.snapshot.ref).then(async(getDownloadURL)=>{
						// update user prfile
						await updateProfile(user,{
							displayName: username,
							photoURL: getDownloadURL,
						})
						//store user data in firestore db
						await setDoc(doc(db, 'users', user.uid),{
							uid: user.uid,
							displayName: username,
							email,
							photoURL: getDownloadURL,
							admin: false,
						})
					})
				})
				setLoading(false)

				toast.success(`Account created`)
				navigate("../login")
			} catch (error) {
				setLoading(false)	
				toast.error("Something went wrong")
			}
		}
		}

  return (
    <div className="form-container">
	<p className="title">Create New Account</p>
	{
	loading ?<div className="custom-loader"></div>:
	
	<Form className="form" onSubmit={handleSubmit}>
	<FormGroup className="input-group">
			<label htmlFor="email">Email</label>
			<input type="email" name="email"  value={email} onChange={e=>setEmail(e.target.value)} required/>
		</FormGroup>
		<FormGroup className="input-group">
			<label htmlFor="username">Username</label>
			<input type="text" name="username"  value={username} onChange={e=>setUsername(e.target.value)} required/>
		</FormGroup>
		<FormGroup className="input-group">
			<label htmlFor="password">Password(6 character min)</label>
			<input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
		</FormGroup>
    <FormGroup className="input-group">
			<label htmlFor="password"> Re-type Password</label>
			<input type="password" name="password"  value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)} required/>
		</FormGroup>

		<FormGroup className="input-group">
		<label htmlFor="pfp"> Add a Profile Picture </label><br />
			<input type="file"  name="pfp" onChange={e=>setFile(e.target.files[0])} required/>
		</FormGroup>
		<button type="submit" className="sign">Sign Up</button>
    <p className="signup mt-3">Already have an account?  <Link to="../login" className="">Sign In</Link>
	</p>
	</Form>
}
	
	
</div>
  )
}

export default Signup
