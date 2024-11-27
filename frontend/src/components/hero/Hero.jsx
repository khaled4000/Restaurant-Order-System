import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="home-about">
      <div className="image">
        <img src={assets.us} alt="" />{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="content">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>why choose us?</span>
        &nbsp;&nbsp; <h3 className="title">what's make our food delicious!</h3>
        <p>
          Food to customers is always guaranteed of the best quality. Our dishes
          are made the best chef in the middle east, delicate, impressive
          flavors. Our delivery service is very professional, customers can
          enjoy the same quality at the restaurant
        </p>
        &nbsp;&nbsp;
        
        <br />
        <div>
          <NavLink to="/AboutUs" className="btn">
            Read More
          </NavLink>
        </div>{" "}
        <br /> <br />
        <br />
        
        <div className="icons-container">
          <div className="icons">
            <img src={assets.hm1} alt="" />
            <h3>Fast Delivery</h3>
          </div>
          <div className="icons">
            <img src={assets.hm2} alt="" />
            <h3>Fresh Food</h3>
          </div>
          <div className="icons">
            <img src={assets.hm3} alt="" />
            <h3>Best Quality</h3>
          </div>
          <div className="icons">
            <img src={assets.hm4} alt="" />
            <h3>24/7 Support</h3>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
