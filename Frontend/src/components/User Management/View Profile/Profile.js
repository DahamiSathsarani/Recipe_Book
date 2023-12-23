import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import './Profile.css'
import { deleteUser } from '../../../API/User_API';
// import React, { useState, useEffect } from 'react';

function Profile() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const user = state?.user;
  console.log(user);
  const chef = user.user;
  

  // const [student, setStudents] = useState({});
  
  //   useEffect(() => {
  //     async function fetchStudents() {
  //       const studentData = JSON.stringify(state?.user);
  //       console.log(studentData);
  //       setStudents(studentData);
  //     }
  
  //     fetchStudents();
  //   });
  
  if (!chef) {
    return <div>No user data available.</div>;
  }

  const handleProfile = async (err) => {
    err.preventDefault();
    try {
        // const response = await login(formData);
    
        // Navigate to the Update route
        navigate('/UserDashboard/Profile/UpdateProfile', { state: { user: user } });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
  };

  const handleDelete = async (err) => {
    err.preventDefault();
    try {
        const response = await deleteUser(chef);
        if (response.success) {
          // Successfully deleted
          alert("Successfully Deleted");
          // Navigate to the Login route
          navigate('/Login');

        } else {
          alert('Failed deleting. Please try again..');
        }
  
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <Table striped bordered hover>
      {/* <thead>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>NIC</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Age</th>
        </tr>
      </thead> */}
      <tbody>
        <tr>
          <th>User Name</th>
          <td>{chef.name}</td>
        </tr>
        <tr>
          <th>NIC</th>
          <td>{chef.nic}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{chef.email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{chef.phone}</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td>{chef.dob}</td>
        </tr>
        <tr>
          <th>Password</th>
          <td>{chef.password}</td>
        </tr>
      </tbody>
    </Table>
    <div className='button'>
      <Button onClick={handleProfile}>Edit Profile</Button>
      <Button onClick={handleDelete}>Delete Profile</Button>
    </div>
    </div>
  );
  }

export default Profile;