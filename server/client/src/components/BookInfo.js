import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import bookmark from '../images/bkmrk.png'
import {toast, ToastContainer} from 'react-toastify';
const BookInfo = () => {
    const location = useLocation();
    const [bookState, setBookState] = useState({});
    useEffect(()=>{
       
       location && setBookState(location.state);
    },[location])
    
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
    <div className='infoContainer'>
         <div className='info-title' style={{fontSize: '60px', color: 'purple', fontWeight:'bold'}}> {bookState.title}</div>
        <div className='info-holder'>
            <div className='info-img-wrapper'>
                {
                    bookState && (<div className='info'>
                        <img className='info-img' src={bookState.link} alt=''/>  
                        <button className='bookmark-btn' style={{ height: '70px',borderRadius:'25px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px'}} onClick = {()=>handleSave(bookState.book_number)}><img src = {bookmark} alt = '' style={{height:'50px', width:'50px'}}/> <div style={{fontSize: '20px', fontWeight:'bold'}}> BookMark </div></button>
                        </div>)
                    
                }
            </div>
            <div className='infoWrapper'>
                {
                    bookState && (<div className='info-items'>
                   
                    <div className='synopsis'><p style={{paddingLeft: '15px'}}>{bookState.synopsis}</p> </div>
                    <div className='info-footer'>
                        <div> Genre: {bookState.genre} </div>
                        <div> ISBN: {bookState.book_number} </div>
                        <div> Demographic: {bookState.demographic} </div>
                    </div>
                    
                    
                    
                    </div>)
                }
            </div>
        </div>
        
    </div>
  )
}

export default BookInfo