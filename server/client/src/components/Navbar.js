import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AppContext from '../context/app-context';
import homeIcon from '../images/homeIcon.png'
import logInBtn from '../images/logIn.png'
import logOutBtn from '../images/logOut.png'
import {toast} from 'react-toastify';
import './navbar.css'
const Navbar = () => {
  const navigate = useNavigate();
  const {isAuth, setAuth} = useContext(AppContext);
  
  useEffect(()=>{
    if(localStorage.token){
      setAuth(true);
    }
  }, []);


  const logOut = (e)=>{
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success('Logged Out Successfully',{position: toast.POSITION.TOP_CENTER});
      navigate('/login');

    } catch (error) {
      console.error(error.message);
    }
  }

  return (

    <div className='nav-container'>
      <div className='home-button'><Link className='nav-links' to = '/'><img className='home-img' src = {homeIcon} alt = ''/></Link></div>
      <div className='nav-wrapper'>
        <div className='nav-items'><Link className='nav-links' to = '/search'>Search</Link></div>
        <div className='nav-items'><Link className='nav-links' to = '/userProfile'>Dashboard</Link></div>
        <div className='log-btn'> {isAuth? <Link className='nav-links' to = '/login' onClick ={logOut} ><img className='home-img' src={logOutBtn} alt = ''/></Link> : <Link className='nav-links' to='/login'><img className='home-img' src={logInBtn} alt = ''/></Link>}</div>
      </div>

    </div>
  
    
  )
}

export default Navbar;