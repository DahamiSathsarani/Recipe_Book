import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../API/User_API';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nic: '',
    dob: '',
    userProPic: null,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: fieldValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: fieldValue,
      });
    }
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
    <div className='Register' fluid>
      <div className='RegisterCard'>
        <div className='RegisterDiv1'>
          <img src="/Images/Register.jpg" alt='register'/>
        </div>
        <div className='RegisterDiv2'>
          <div className='RegisterHeader'>
            <h2>Create an Account</h2>
          </div>
          <div className='RegisterForm'>
            <form onSubmit={handleSubmit} className='Register_form'>
              <div>
                <label htmlFor="name">Full Name :</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="email">Email :</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="phone">Phone Number :</label>
                <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="nic">NIC :</label>
                <input type="text" id="nic" name="nic" value={formData.nic} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="age">Date of Birth :</label>
                <input type="text" id="dob" name="dob" value={formData.dob} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="userProPic">Upload Profile Picture :</label>
                <input type="file" id="userProPic" name="userProPic" onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="password">Password :</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}/>
              </div>
              {/* <div>
                <label htmlFor="password">Confirm Password :</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}/>
              </div> */}
              <div className='RegisterButton'>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
