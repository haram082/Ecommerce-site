import React, { useState } from 'react'
import "./styles/login.css"
import { Link } from 'react-router-dom'
import { Form, FormGroup } from 'reactstrap'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const signIn = async(e) =>{
		e.preventDefault()
		setLoading(true)
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			toast.success('Logged in successfully')
			setLoading(false)
			navigate("../home")
			
		} catch (error) {
			setLoading(false)
			toast.error(error.message)
		}

	}

  return (
    <div className="form-container">
		{
			loading ? <div className="custom-loader"></div>	: 
		<>
	<p className="title">Login</p>
	<Form className="form" onSubmit={signIn}> 
		<FormGroup className="input-group">
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" placeholder="" value={email} onChange={e=>setEmail(e.target.value)}/>
		</FormGroup>
		<FormGroup className="input-group">
			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" placeholder="" value={password} onChange={e=>setPassword(e.target.value)}/>
			<div className="forgot">
				<Link to="#">Forgot Password ?</Link>
			</div>
		</FormGroup>
		<button type="submit" className="sign">Sign in</button>
		<p className="signup mt-3">Don't have an account?  <Link to="../signup" className="">Sign up</Link></p>
		<div className='text-start mt-3'>
		<p>Sample Admin Email: admin1@gmail.com</p>
		<p>Password: 123456</p>
		<p>Sample Customer Email: customer_email@gmail.com</p>
		<p>Sample Password: 123456</p>
		</div>
	
	</Form></>
}
	
	
</div>
  )
}

export default Login
