import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import "./Hero1.css";
const Hero1 = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* <h3   className="banner" >Choose Waht You Want!</h3> */}
      <br/>
    <div className="home-category">
  
<NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.salad} alt="" />
        <h3>salad</h3>
      </NavLink>

      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.rolls} alt="" />
        <h3>Rolls</h3>
      </NavLink>

      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.des} alt="" />
        <h3>Desserts</h3>
      </NavLink>

      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.sandwich1} alt="" />
        <h3>Sandwich</h3>
      </NavLink>

    

      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.cake} alt="" />
        <h3>cake</h3>
      </NavLink>

    

  
  
      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.pure_veg} alt="" />
        <h3>Pure Veg</h3>
      </NavLink>

      <NavLink onClick={scrollToTop} to="/menu" className="box">
      
        <img src={assets.Pasta} alt="" />
        <h3>Pasta</h3>
      </NavLink>
      <NavLink onClick={scrollToTop} to="/menu" className="box">
        <img src={assets.noodles} alt="" />
        <h3>Noodles</h3>
      </NavLink>

 
    </div>
    <h3 className="lab" >Our Food is The Best</h3>
    </div>

  );
};

export default Hero1;
