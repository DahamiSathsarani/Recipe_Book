import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../API/User_API';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nic: '',
    dob: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (err) => {
    err.preventDefault();
    try {
        const response = await createUser(formData);
    
        if (response.success) {
          // Data was successfully registered
          alert("Registration Successful")
          // Navigate to the StudentDetails route
          navigate('/Login');

        } else {
          alert('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error registering student:', error);
        alert('An error occurred. Please try again..');
      }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="nic">NIC:</label>
          <input type="text" id="nic" name="nic" value={formData.nic} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="age">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
