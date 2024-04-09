import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async(e) => {
    console.log(process.env.REACT_APP_API_URL);
    console.log(formData);
    e.preventDefault();
    try {
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`,formData);
        if(response.data.success)
        {
            toast.success("sign up successful");
            navigate("/");
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className='form-container'>
      <h2 className='center'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Signup</button>
      </form>
      <a href='/'>Login here</a>
    </div>
  );
};

export default Signup;
