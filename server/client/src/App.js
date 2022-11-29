import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import UserProfle from './components/UserProfile';
import AppContext from './context/app-context';
import Books from './components/Books';
import BookInfo from './components/BookInfo';

const App = () => {

  const {isAuth} = useContext(AppContext);

  return (
    <Router>
      
      <Navbar/>

        <Routes>
          <Route path ='/' element = {<Books/>}/>
          <Route path='/search' element = {<Home/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/userProfile' element = {isAuth ? (<UserProfle/>) : (<Navigate replace to={'/login'}/>)}/>
          <Route path = 'info' element = {<BookInfo/>}/>
        </Routes>
   
    </Router>
  )
}

export default App
