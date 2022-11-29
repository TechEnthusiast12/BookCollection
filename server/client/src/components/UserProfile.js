import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import cancel from '../images/cancel.png'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const UserProfile = () => {
    const [user, setUser] = useState('');
    const [userBooks, setUserBooks] = useState([]);
    const [deleted, setDeleted] = useState([]);

    const getUser = async()=>{
      try {

        const response = await fetch("https://bookcollectionwebapp.herokuapp.com/dashboard", {
        method: "GET",
        headers: {"token": localStorage.token},
      }) 

      const parseRes = await response.json();
      setUser(parseRes.user_name);
     

      } 
      catch (error) {

        console.error(error.message);
      }
    }

    const getUserBooks = async()=>{
      try {
        
        const response = await fetch("http://localhost:8000/dashboard/userBooks", {
        method: "GET",
        headers: {"token": localStorage.token},
      }) 

      const parseRes = await response.json();

      setUserBooks(parseRes);

      } 
      catch (error) {

        console.error(error.message);
      }
    }

    const handleDelete = async (user_id, book_number)=>{
      try {
        const response = await fetch(`http://localhost:8000/dashboard/userBooks?user_id=${user_id}&book_number=${book_number}`,{
          method: "DELETE",
          headers:{"token": localStorage.token}
        })
        const parseRes = await response.json();
        if(parseRes.length > 0){
          setDeleted(parseRes);
          toast.success('Succesfully removed', {position: toast.POSITION.TOP_CENTER});
        }
        
      } catch (error) {
        console.error(error.message);
      }
    }

    useEffect(()=>{
        getUser()
    }, [])

    useEffect(()=>{
      getUserBooks();
      
    }, [deleted])
  return (
    <div className='book-container'>
      <p id='home-title' style={{color: 'white'}}>Welcome to Your DashBoard, {user}</p>
      <div className='book-wrapper'>
      {
        userBooks?.map((data) => {
          return (
            <div key={data.book_number} className='item'>
             <Link className='book-cover' to='/info' state = {data}><img className='books' src={data.link} alt={data.title} /></Link>
             <div className='icon-container'>
              <h2 className='data-title' >{data.title}</h2>
              <div className='img-box'>
                <img className='icon' src={cancel} onClick={()=>handleDelete(data.user_id, data.book_number)} alt = ''/>
              </div>
              
             </div>
             
            </div>
          )
        })
      }

      </div>
      {Object.keys(userBooks).length === 0 && <div style={{color: 'white', fontSize:'30px'}}>You Currently have 0 Books Saved.<br/> Please Add Books To Your Dashboard</div>}
    </div>
  )
}

export default UserProfile;