import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Profile.css'

import { getSpecificUserRecipes } from '../../../API/Recipe_API';

function Profile() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const user = state?.user;
  const chef = user.user;
  
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes
  useEffect(() => {
      
    const fetchRecipes = async () => {
      try {
        const response = await getSpecificUserRecipes(chef.user_id);
        
        if (Array.isArray(response)) {
          setRecipes(response);
        } else {
          console.error(`Failed to fetch recipes. ${response.error}`);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [chef.user_id]);

  const handleProfile = async (err) => {
    err.preventDefault();
    try {
        // Navigate to the Update route
        navigate('/UserDashboard/Profile/UpdateProfile', { state: { user: user } });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
  };

  // const handleDelete = async (err) => {
  //   err.preventDefault();
  //   try {
  //       const response = await deleteUser(chef);
  //       if (response.success) {
  //         // Successfully deleted
  //         alert("Successfully Deleted");
  //         // Navigate to the Login route
  //         navigate('/Login');

  //       } else {
  //         alert('Failed deleting. Please try again..');
  //       }
  
  //     } catch (error) {
  //       alert('An error occurred. Please try again..');
  //     }
  // };

  return (
    <section className='Profile' fluid>
      <Container className='ProfileHeader'>
        <Row>
          <div className='col-md-4 ProfilePersonalDetails'>
              <Row className='d-flex justify-content-center align-items-center p-3'>
                <img className='ProfileImage' src={chef.imgUrl} alt=''></img>
              </Row>
              <Row className='p-3'>
                <h1>{chef.name}</h1>
                <h5>{chef.email}</h5>
              </Row>
              <Row className='d-flex justify-content-center p-3'>
                <Button className='' onClick={handleProfile}>Edit Profile</Button>
              </Row>
            </div>
          <div className='col-md-8'>
            <Row className='p-3'>
              <h2>My Recipes</h2>
            </Row>
            <Row xs={1} md={2} lg={5} className="g-4 p-3">
              {recipes.map((recipe) => (
                <Col key={recipe._id} className='m-3'>
                  <Card className='ProfileMyrecipesCard'>
                    <Link className=''>
                      <Card.Img variant="top" src={recipe.imgUrl} alt={recipe.title} />
                    </Link>
                    <Card.Body className=''> 
                      <Card.Title className='ProfileMyrecipesCardTitle'>{recipe.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Button onClick={handleProfile}>See More</Button>
            </Row>
          </div>
        </Row>
      </Container>
      
    </section>
  );
  }

export default Profile;