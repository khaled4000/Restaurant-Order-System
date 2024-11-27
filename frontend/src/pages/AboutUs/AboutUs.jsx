import React, { useState } from "react";
import Header from "../../components/Header/Header";
import AppDownload from "../../components/AppDownload/AppDownload";
import { assets } from "../../assets/assets";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <section className="about-section">
      <h1 className="ab">About us</h1>
      <div className="heading">
        
        <h2>good quality dishes !</h2>
      </div>

      <div className="row">
        <div className="about-content">
          <img src={assets.chief} alt="" />
          <div className="about-content-text">
            <p className="ptext">
              Welcome to Tomato, your go-to destination for all things culinary!
              We're passionate about food and everything that surrounds it –
              from cooking and baking to dining out and exploring global
              cuisines. At Tomato, we're on a mission to inspire and empower
              food lovers of all skill levels. Whether you're a seasoned chef or
              a kitchen novice, you'll find a wealth of resources, recipes, and
              tips to fuel your culinary adventures. From rools and to decadent
              desserts and everything in between, our curated collection of
              recipes promises to delight your taste buds and ignite your
              creativity. Let us be your guide as you embark on a flavorful
              journey through the world of food. So whether you're looking for
              weeknight dinner ideas, planning a special celebration, or simply
              craving a taste of something new, Tomato has you covered. Let's
              dive in and explore the endless possibilities that the world of
              food has to offer. Welcome to Tomato – where every meal is an
              adventure!
            </p>
            <p>
              Customers can eat at the restaurant to experience the Mexican
              atmosphere or can order food to be delivered to their homes.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="about-article">
          <h3>food brings people together</h3>
        </div>
      </div>

      <div className="row gallery">
        <div className="wrapper">
          <img src={assets.no_bake} alt="" />
          <img src={assets.ps} alt="" />
          
          <img src={assets.miso} alt="" />
          <img src={assets.sldd} alt="" />
 
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
