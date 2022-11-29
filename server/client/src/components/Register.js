import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppContext from '../context/app-context'
const Register = () => {
    const {isAuth, setAuth} = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const handleEmail = (e)=>{
        e.preventDefault();
        setEmail(e.target.value);

    }

    
    const handlePassword = (e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const handleName = (e)=>{
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const body = {email, password, name};
            const response = await fetch("https://bookcollectionwebapp.herokuapp.com/auth/register",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await response.json();
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Registered Successfully", {position: toast.POSITION.TOP_CENTER});
                navigate('/login');             
              }
            else{
                setAuth(false)
                toast.error(parseRes);
            }
            
            
        } catch (error) {
            console.error(error.message);
        }
    };
  return (
    <div className="formContainer">
    
      <div className="register">
      <h1 className='headers'>Register An Account</h1>
     
      <form action="" method="" onSubmit={handleSubmit}>
          <input type= 'text' name='name' placeholder='username' onChange={handleName} value = {name} autoComplete = 'off' required/>
          <input type="email" name="email" placeholder="E-Mail" onChange={handleEmail} value={email} autoComplete = "off" required/>
          <input type="password" name="password" placeholder="Password" value = {password} onChange={handlePassword}/>
           
        <button className="submit">Login</button>
      </form>
      <p>Already have an Account ? <Link to= '/login'>LogIn</Link></p>
  </div>
</div>
    
  )
}

export default Register;

