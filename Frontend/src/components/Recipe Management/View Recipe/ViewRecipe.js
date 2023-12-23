import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import './ViewRecipe.css'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
// import { deleteUser } from '../../../API/User_API';
// import React, { useState, useEffect } from 'react';

function ViewRecipe() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const recipe = state?.recipe;
  console.log(recipe);
  

  // const [student, setStudents] = useState({});
  
  //   useEffect(() => {
  //     async function fetchStudents() {
  //       const studentData = JSON.stringify(state?.user);
  //       console.log(studentData);
  //       setStudents(studentData);
  //     }
  
  //     fetchStudents();
  //   });

  const handleProfile = async (err) => {
    err.preventDefault();
    // try {
    //     // const response = await login(formData);
    
    //     // Navigate to the Update route
    //     navigate('/UserDashboard/Profile/UpdateProfile', { state: { user: user } });
    //   } catch (error) {
    //     alert('An error occurred. Please try again..');
    //   }
  };

  const handleDelete = async (err) => {
    err.preventDefault();
    // try {
    //     const response = await deleteUser(chef);
    //     if (response.success) {
    //       // Successfully deleted
    //       alert("Successfully Deleted");
    //       // Navigate to the Login route
    //       navigate('/Login');

    //     } else {
    //       alert('Failed deleting. Please try again..');
    //     }
  
    //   } catch (error) {
    //     alert('An error occurred. Please try again..');
    //   }
  };

  return (
    <Container className='ViewRecipe' fluid>
      <h2 >{recipe.title}</h2>
      <Row className='ViewRecipeHeader'>
        <img className='ViewRecipeImage' src={recipe.imgUrl} alt='recipe.title'>
            
        </img>
      </Row>
      {/* <div className='button'>
        <Button onClick={handleProfile}>Add to Favourites</Button>
        <Button onClick={handleDelete}>Delete Profile</Button>
      </div> */}
    </Container>
  );
  }

export default ViewRecipe;