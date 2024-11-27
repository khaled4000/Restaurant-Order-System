import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import BookTable from './pages/BookTable/BookTable'
import MyOrders from './pages/MyOrders/MyOrders'
import MyTables from './pages/MyTables/MyTables'
import Menu from './pages/Menu/Menu'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Menu' element={<Menu/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/book' element={<BookTable/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
          <Route path='/mytable' element={<MyTables/>}/>
         <Route path='/ContactUs' element={<ContactUs/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
