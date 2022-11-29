import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import bookmark from '../images/bkmrk.png'
import {toast} from 'react-toastify';
const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
     const getBooks = async()=>{
        const response = await axios.get("https://bookcollectionwebapp.herokuapp.com/books/popular");
        setBooks(response.data);
        }
        getBooks();
    }, [])


    const handleSave = async (book_number)=>{
        try {
            const res = await fetch("https://bookcollectionwebapp.herokuapp.com/results",{
                method: "POST",
                headers:{"token": localStorage.token,"Content-Type": "application/json"},
                body: JSON.stringify({book_number})
            })
            const parseRes = await res.json();
            
            parseRes === "Successfully Added" ? toast.success("Successfully Added", {position: toast.POSITION.TOP_CENTER}) : toast.error(parseRes,{position: toast.POSITION.TOP_CENTER});
            
        } catch (error) {
            console.error(error.message);
            
            
        }
    }

    
  return (
    <div className='book-container'>
      <p id='home-title'style={{color: 'white'}} >Popular Books</p>
      <div className='book-wrapper'>
      {
        books?.map((data) => {
          return (
            <div key={data.book_number} className='item'>
            <Link className='book-cover' to='/info' state = {data}><img className='books' src = {data.link} alt={data.title} /></Link>
             <div className='icon-container'>
             <h3 className = 'data-title'><Link className='book-cover' to='/info' state = {data}>{data.title}</Link></h3>
              <div className='img-box'>
                <img className='icon' src={bookmark} alt='' onClick={()=> handleSave(data.book_number)}/>
              </div>
              
             </div>
             
            </div>
          )
        })
      }

      </div>
     
    </div>
  )
}

export default Books
