import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../API/User_API';
import './Login.css';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Anchor from 'react-bootstrap/Anchor';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reg_no: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (err) => {
    err.preventDefault();
    try{
      // Navigate to the SignUp route
      navigate('/Register');
    } catch (error) {
      alert('An error occurred. Please try again..');
    }
  }

  const handleSubmit = async (err) => {
    err.preventDefault();
    try {
        const response = await login(formData);
    
        if (response.success) {
          // Successfully Login
          alert("Login Successful");
          // Navigate to the StudentDetails route
          navigate('/UserDashboard', { state: { user: response } });

        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
  };

  return (
    <Container className='Login' fluid>
      <div className='LoginCard'>
        <div className='LoginDiv1'>
          <h2 className='LoginHeader'>WELCOME to <br></br><span>CookBook</span></h2>
          <form onSubmit={handleSubmit} className='LoginForm'>
            <div className='LoginContent'>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}/>
            </div>
            <p>Don't have an account yet!</p>
            <Anchor href="#" class="text-warning" className='LoginLink' onClick={handleSignup}>Sign up</Anchor>
            <button type="submit" className='LoginButton'>Login</button>
          </form>
        </div>
        <div className='LoginDiv2'>
          <img src="/Images/login.jpg" alt='login' />
        </div>
        
      </div>
    </Container>
  );
}

export default Login;
