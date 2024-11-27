import React, { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import { useLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import { assets } from "../../assets/assets";

const Login = () => {
  const navigate = useNavigate();

  const { setStorage } = useLocalStorage();
  const [state, updateState] = useState({
    username: "",
    password: "",
  });

  const setState = (nextState) =>
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let method = "POST";
    let api = "auth/adminToken";
    let reqBody = state;
    let header = {};

    const result = await fetchData({ method, api, reqBody, header });
    console.log(result);

    if (result.error) {
      toast.error(result.error);
    } else {
      const message = result?.message;

      if (message === "Token generated successfully") {
        toast.success("administrator login successfully ");
        const token = result?.token_access;
        setStorage("admin-token", token);
        setTimeout(() => {
          navigate("/add");
          window.location.reload();
        }, 1000);
      } else if (message === "Invalid username or password") {
        setState({ username: "", password: "" });
        toast.error(message);
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="h11">&nbsp; Admin Login &nbsp;</h1>

      <br />
      <br />
      <br />
      <br />
      <img src={assets.login_icon} alt="" className="i-g" />
      <br />
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          name="username"
          value={state.username}
          placeholder="username"
          onChange={handleChange}
          className="input-field"
        />
        <input
        type="password"
          required
          name="password"
          value={state.password}
          placeholder="password"
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
