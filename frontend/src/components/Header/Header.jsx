import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food.</h2>
                <p>Select from an extensive menu offering a delightful range of dishes prepared with top-quality ingredients and culinary skill. Our goal is to fulfill your desires and enhance your dining journey, one flavorful meal after another.</p>
                <button > <Link to="/Menu" >View Menu</Link></button>
            </div>
        </div>
    )
}

export default Header
