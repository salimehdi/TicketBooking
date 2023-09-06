import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth'
import './Login.css'

const LoginPage = ()=>{
    const navigate = useNavigate()
    const [email,setName] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const LogInFunction = async ()=>{
        try {
            await signInWithEmailAndPassword(getAuth(),email , password)
            navigate('/cart')
        } catch (e) {
            setError(e.message)
        }
    }
    return(
        <div className="outer">
        <h1>Log In Form</h1>
        {error && <p className="error">{error}</p>}
        <input 
        type="text"
        placeholder="Your Email"
        value={email}
        onChange={e=> setName(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={e=> setPassword(e.target.value)}
        />
        <button onClick={LogInFunction}>
            Log In
        </button>
        <Link style={{color:"#fff"}} to="/create-account">
            If you dont have an account click here
        </Link>
        </div>
    )
}
export default LoginPage