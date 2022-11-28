import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context/app-context'
import {toast} from 'react-toastify';
const Login = () => {
    const {isAuth, setAuth} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e)=>{
        e.preventDefault();
        setEmail(e.target.value);
        
    }
    
    const handlePassword = (e)=>{
        e.preventDefault();
        setPassword(e.target.value);
        
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:8000/auth/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
            });
            const parseRes = await response.json();
          

            if(parseRes.token){
              localStorage.setItem("token", parseRes.token);
              setAuth(true);
              toast.success("Logged In Successfully", {position: toast.POSITION.TOP_CENTER});
              navigate('/userProfile');             
            }
            
            else{
            setAuth(false);
             toast.error(parseRes);
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <div className="formContainer">
      
        <div className="register">
        <h1 className='headers'>Login</h1>
       
        <form action="" method="" onSubmit={handleSubmit}>

            <input type="email" name="email" placeholder="E-Mail" onChange={handleEmail} value={email} autoComplete = "off" required/>
            <input type="password" name="password" placeholder="Password" value = {password} onChange={handlePassword}/>
             
          <button className="submit">Login</button>
        </form>
        <p>Don't have an Account ? <Link to= '/register'>Register</Link></p>
    </div>
  </div>
  )
}

export default Login