
import "react-toastify/dist/ReactToastify.css"; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this
import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useLocalStorage } from "../../utils/localStorage";
import { fetchData } from "../../utils/fetchData";

import { useNavigate } from "react-router-dom";



const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
};

const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { setStorage } = useLocalStorage();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const onLogin = async (event) => {
    event.preventDefault();

    if (currState === "Sign Up") {
      const method = "POST";
      const api = "auth/register";
      const reqBody = {
        username: data.username,
        phone_number: data.phone,
        email: data.email,
        password: data.password,
      };

      const response = await fetchData({
        method,
        api,
        reqBody,
        isFormData: true,
      });
      console.log(response);

      if (response?.error) {
        toast.error(response?.error);
      } else {
        const message = response?.message;
        const status = response?.status;
        if (status === "true") {
          toast.success(message);
          setData(initialState);
          setCurrState("Login");
        } else if (status === "false") {
          toast.error(message);
        }
      }
    } 
    else {
      const method = "POST";
      const api = "auth/login";
      const reqBody = data;


     try {
      const result = await fetchData({ method, api, reqBody });
      console.log(result);
      if (result.error) {
        toast.error("Invalid  username or password !");
        setData((prevData) => ({
          ...prevData,

          username:"", 
          password:"",
        }));

      }
      
       else {
        const message = result?.message;
        const status = result?.status;
        if (status === "pfalse"){

          toast.error(message);
        }
        else{
          toast.info(message);
        }

    
        if (message === "Please verify your email first") {
         
          //toast.info("Please verify your email first then re-login");

        } 
        else
        
        if (status === "pfalse") {
          //toast.error("Invalid username or  password !!");
          setData((prevData) => ({
            ...prevData,
            username:"",
            password: "", 
          }));
        } 
        
        
        else {
         // toast.success(message);
            console.log(result)
          const token = result?.user.token_access;
          const userid = result?.user.id;
          setStorage("user-token", token);
          setStorage("user-id", userid);
          localStorage.setItem("token", token)
          setShowLogin(false)
          navigate("/");
          window.location.reload();

        }
      }
    } catch (error) {
      // Catch unexpected token error
      //toast.error("Invalid  password !!");
     console.error(error);
    }
    }
  };

  return (
    <div className="loginp-opp">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
        <ToastContainer /> 
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-input">
          {currState === "Login" ? (
            <>
              <input
                type="text"
                placeholder="UserName"
                required
                name="username"
                value={data.username}
                onChange={onChangeHandler}
              />

              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={data.password}
                onChange={onChangeHandler}
              />

              <input
                className="login-popup-checkbox"
                type="checkbox"
                required
              />
              <p className="login-popup-condition">
                I agree to the terms of use & privacy policy.
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="UserName"
                required
                name="username"
                value={data.username}
                onChange={onChangeHandler}
              />

              <input
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                value={data.email}
                onChange={onChangeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={data.password}
                onChange={onChangeHandler}
              />
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                name="phone"
                value={data.phone}
                onChange={onChangeHandler}
                // pattern="^961\d{10,13}$"
              />
            </>
          )}
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Don't Have An Account?{" "}
            <span className="log" onClick={() => setCurrState("Sign Up")}>
              Create one
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span className="log" onClick={() => setCurrState("Login")}>
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

