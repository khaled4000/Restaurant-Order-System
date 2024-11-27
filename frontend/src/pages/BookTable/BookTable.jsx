import React, { useContext, useEffect, useState } from 'react'
import './BookTable.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';


const BookTable = () => {

    const url = "https://deploy-test-xspm.onrender.com";
 // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NTMwNTI0LCJpYXQiOjE3MTU0NDQxMjQsImp0aSI6ImE1YTcxYTM2MTNhZjQyNDE4MjU5NjA1NjdiYjQyY2I5IiwidXNlcl9pZCI6N30.XKQc2s1W6Qx3qawUjs8qMI2nkP5CgUfIdyQ7SOYmibY")
 
    const [data, setData] = useState({
        tableNumber:"",
        numberPeople:"",
        bookName:"",
        bookPhone:"",
        bookNote:"",
        bookDate:""
       
    })

 

    const {BookTableLoad ,token,userid } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

   


    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className='title'>Reservation Information</p>
                <div className="multi-field">
                    <input type="text" name='tableNumber' onChange={onChangeHandler} value={data.tableNumber} placeholder='Table Number' />
                    <input type="text" name='numberPeople' onChange={onChangeHandler} value={data.numberPeople} placeholder='Number of People' />
                </div>
                <div className="multi-field">
                <input type="text" name='bookName' onChange={onChangeHandler} value={data.bookName} placeholder='Name' />
                <input type="text" name='bookPhone' onChange={onChangeHandler} value={data.bookPhone} placeholder='Phone' />
                </div>
                <div className="multi-field">
                <input type="text" name='bookNote' onChange={onChangeHandler} value={data.bookNote} placeholder='Note' />
                <input type="date" name='bookDate' onChange={onChangeHandler} value={data.BookDate} placeholder='Reservation Date' />
                </div>

              
            </div>
           
                <div className="payment-options">
                    <h2>Book</h2>
                 

                    <button onClick={() => BookTableLoad(data.tableNumber,data.numberPeople,data.bookName,data.bookPhone,data.bookNote,data.bookDate,token,userid)}>Book Table</button>
                </div>

            </div>
     
    )
}

export default BookTable
