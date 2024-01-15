import React, { useState } from 'react';
import './UpdateProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { updateUser } from '../../../API/User_API';;

function UpdateProfile() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const user = state?.user;
  const chef = user.user;

  const [formData, setFormData] = useState({
    name: chef.name || '',
    email: chef.email || '',
    phone: chef.phone || '',
    nic: chef.nic || '',
    dob: chef.dob || '',
    password: chef.password || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfilePic = async (err) => {
    err.preventDefault();
    try{

    }catch{

    }
  }

  const handleSubmit = async (err) => {
    err.preventDefault();
    try {
        const response = await updateUser(formData);

        if (user && user._id) {
          // Data was successfully registered
          alert("Profile Updated Successful")
          // Navigate to the StudentDetails route
          navigate('/UserDashboard/Profile', { state: { user: response } });

        } else {
          alert('Updating failed. Please try again.');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        alert('An error occurred. Please try again..');
      }
  };

  return (
    <div>
      <Container>
        <Row>
          <div className='col-md-4'>
            <Row className='d-flex justify-content-center align-items-center p-3 mt-5'>
              <img className='ProfileImage' src={chef.imgUrl} alt=''></img>
            </Row>
            <Row className='d-flex justify-content-center p-3'>
              <button className='' onClick={handleProfilePic}>Edit Profile Picture</button>
            </Row>
          </div>
          <div className='col-md-8 d-flex justify-content-center align-items-center'>
            <form onSubmit={handleSubmit} className='UpdateProfileForm mt-5'>
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
                <input type="text" id="dob" name="dob" value={formData.dob} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}/>
              </div>
              <button type="submit" className='UpdateButton'>Update</button>
            </form>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default UpdateProfile;
