import React from "react";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";



import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import Order from "./pages/Orders/Order";
import { useLocalStorage } from "./utils/localStorage";



const AuthRequire = ({ element: Element, isLoggedin }) => {
  return !isLoggedin ? <Navigate to="/login" /> : <Element />;
};

const AuthNotRequire = ({ element: Element, isLoggedin }) => {
  return isLoggedin ? <Navigate to="/list" /> : <Element />;
};

const App = () => {
  const { getStorage } = useLocalStorage();
  const token = getStorage("admin-token");

  const isLoggedIn = !token || token == "" ? false : true;
  console.log({ token })
  return (
    <div>
      <ToastContainer />
      {isLoggedIn ? <Navbar /> : <></>}
      <hr />
      <div className="app-content">
        {isLoggedIn ? <Sidebar /> : <></>}
        <Routes>
          <Route path="/" element={<AuthNotRequire element={Login} isLoggedin={isLoggedIn} />} />
          <Route path="/add" element={<AuthRequire element={Add} isLoggedin={isLoggedIn} />} />
          <Route path="/list" element={<AuthRequire element={List} isLoggedin={isLoggedIn} />} />
          <Route path="/orders" element={<AuthRequire element={Order} isLoggedin={isLoggedIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
