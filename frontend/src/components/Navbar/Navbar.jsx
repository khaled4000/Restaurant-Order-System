import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

import "react-toastify/dist/ReactToastify.css"; // import first
import { ToastContainer, toast } from 'react-toastify';

const Navbar = ({setShowLogin}) => {
  const navigate =useNavigate();
  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
 const logout =()=>{
  localStorage.removeItem("user-token");
  localStorage.removeItem("token");
  localStorage.removeItem("user-id");
  setToken("");
  navigate("/")


 }
 const myorder=()=>{
  navigate("/myorder")
 }
 const mytable=()=>{
  navigate("/mytable")
 }
  return (
    <div className='navbar'>
       <ToastContainer /> 
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>Home</Link>
        <Link to='/AboutUs' onClick={()=>setMenu("about")} className={`${menu==="about"?"active":""}`}>About </Link>
       <Link to="/Menu" onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>Menu</Link>
       <Link to='/book' onClick={()=>setMenu("book")} className={`${menu==="book"?"active":""}`}>Book A table</Link> 
      
      
       
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='navbar-search-icon'>
          
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()===0?"dot":""}></div>
        </Link>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='nabar-pro'>
          <img src={assets.profile}
                         />
          <ul className="navprod">
            <li onClick={myorder}>
              <img src={assets.bag_icon} alt="" />
              <p>Orders</p>
            

              </li>
              <li onClick={mytable}>
              <img src={assets.bag_icon} alt="" />
              <p>Tables</p>
            

              </li>
              <hr />
              
             
           <li onClick={logout}> 
           <img src={assets.logout_icon} alt="" />
           <p>Logout</p>
            </li>
          </ul>
          
          </div>}
        

      </div>
    </div>
  )
}

export default Navbar
