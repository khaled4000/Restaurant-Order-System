import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token} = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.get(url+"/bill_status/get/",{ headers: {"Authorization" : `Bearer ${token}`} });
    setData(response.data)
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((item,index)=>{
          return (
            <div key={index} className='my-orders-order'>
             <img src='../../src/assets/parcel_icon.png' alt="" />
             
                
            <p>Bill Address: {item.bill_address}</p>
            <p>Delivery Fee: ${item.bill_delivery}</p>
            <p>Total: ${item.bill_total}</p>
            <p>${item.bill_method}</p>
                <p><span>&#x25cf;</span> <b>{item.bill_status}</b></p>
               
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
