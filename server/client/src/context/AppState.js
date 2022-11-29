import React from 'react'
import { useState, useEffect } from 'react';
import AppContext from './app-context';

const AppState = (props) => {
    const [isAuth, setAuth] = useState(true);
    const [userId, setuserId] = useState('');
      // For Authentication 
  useEffect(()=>{
    try {

      const Verify = async()=>{
        const response = await fetch('https://bookcollectionwebapp.herokuapp.com/auth/verify',{
        method: 'GET',
        headers: {token: localStorage.token}
        });

      const parseRes = await response.json();
      
      parseRes === true ? setAuth(true) : setAuth(false);
      
      }

      Verify();
      

    } catch (error) {
      console.error(error.message);
    }
   
  }, [])

  return (
    <AppContext.Provider value={{isAuth, setAuth, userId}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppState;