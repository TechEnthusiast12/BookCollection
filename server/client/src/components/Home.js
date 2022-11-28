import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';
const Home = () => {

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(()=>{
    const getBooks = async()=>{
      const response = await axios.get(`http://localhost:8000/books?q=${query}`);
      
      setData(response.data);
    }
    if ( query.length===0 || query.length >= 2) getBooks();
   
  },[query]);

  return (
    <div className='search'>
      <div className='book'>

      
      <input className='book-input' type= 'text' placeholder='Search For Books' onChange={(e)=> setQuery(e.target.value)}/>

      <div className='data'>

        <div className='data2'>

        
      {data?.map((item)=>(
        <div key={item.book_number} className = 'book-contents'>
          <div className='result'> <Link to='/info' state={item}><img className='search-img' src={item.link} alt = {item.title}/></Link></div>

          <div className='inner'>
            <h1>{item.title}</h1>
            <h3>{item.genre}</h3>
            <h3>{item.demographic}</h3>
            <h3>{item.book_number}</h3>
          </div>
          
          
        </div>
        
      ))}
      </div>
    
      </div>
   
      
      </div>
    </div>
  )
}

export default Home;