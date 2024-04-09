import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContex";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {auth,setAuth}=useAuth();
  const navigate = useNavigate();

  console.log("login ",auth);
const token=auth?.token;
console.log(token);
  useEffect(()=>{
    if(!token)
    {
      navigate("/");
    }
    else{
      navigate("/home")
    }
  },[token]); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);

      console.log("response ",response.data);
      if (response.data.success) {
       // toast.success("sign up successful");
        setAuth({
          ...auth,
          user:response.data.user,
          token:response.data.token
        });
        localStorage.setItem("loginUser",JSON.stringify(response.data));
        toast.success("Successful login");
        setTimeout(()=>{
          navigate("/home");

        },2000)
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="center">Login here</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Sign up</a>
    </div>
  );
};

export default Login;
