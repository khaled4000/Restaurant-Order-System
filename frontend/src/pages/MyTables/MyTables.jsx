import React, { useContext, useEffect, useState } from 'react'
import './MyTables.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyTables = () => {
  
  const [data,setData] =  useState([]);
  const {url,token} = useContext(StoreContext);

  const fetchTables = async () => {
    const response = await axios.get(url+"/book_table/get/",{ headers: {"Authorization" : `Bearer ${token}`} });
    setData(response.data)
    console.log(response.data);
  }

  useEffect(()=>{
    if (token) {
      fetchTables();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Tables</h2>
      <div className="container">
        {data.map((item,index)=>{
          return (
            <div key={index} className='my-orders-order'>
             <img src='../../src/assets/profile_icon.png' alt="" />
  
            <p>Table Booked: {item.book_tables}</p>
            <p>Name booked: {item.book_name}</p>
            <p>Phone: {item.book_phone}</p>
                <p><span>&#x25cf;</span> <b>{item.book_note}</b></p>
               
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTables
