import React, { useEffect } from 'react'
import { createContext, useState } from "react";
const userContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState([])
    useEffect(()=>{
        const getUser = async()=>{
            try {
      
              const response = await fetch("http://localhost:8000/dashboard", {
              method: "GET",
              headers: {"token": localStorage.token},
            }) 
      
            const parseRes = await response.json();
            setUser(parseRes.user_name);
            console.log(parseRes);
      
            } 
            catch (error) {
      
              console.error(error.message);
            }
          }
          getUser();
    }, [])
    return(
        <userContext.Provider value = {{user}}>
            {children}
        </userContext.Provider>
    )
}