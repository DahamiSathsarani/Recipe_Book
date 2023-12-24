import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import './ViewRecipe.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
// import { deleteUser } from '../../../API/User_API';
// import React, { useState, useEffect } from 'react';

function ViewRecipe() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const recipe = state?.recipe;
  const Result = state?.result;
  const ingredients = Result.ingredientResult;
  const steps = Result.stepsNames;

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
        <img className='ViewRecipeImage' src={recipe.imgUrl} alt='recipe.title'></img>
        <div className=''>

        </div>
      </Row>
      <div className='ViewRecipeContent'>
        <div className='ViewRecipeIngredients'>
          <div className='ViewRecipeTable'>
            <div className='ViewRecipeContentHeader'>
              <h2>You will need ?</h2>
            </div>
            <div className='ViewRecipeContent1'>
              <div className='ViewRecipeContent2'>
                {ingredients.map((item, index) => (
                  <div key={index} className='ViewRecipeIngredient'>
                    <div>
                      <strong>{item.ingredient_name} :</strong> {item.quantity} {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='ViewRecipeSteps'>
          <div className='ViewRecipeTable'>
            <div className='ViewRecipeContentHeader'>
              <h2>Let's make it..</h2>
            </div>
            <div className='ViewRecipeContent1'>
              <div className='ViewRecipeContent2'>
                {steps.map((item, index) => (
                  <div key={index} className='ViewRecipeIngredient'>
                    <div>
                      <h5>{index+1}. {item.step} </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ViewRecipeButton'>
        <Button onClick={handleProfile}>Add to Favourites</Button>
        <Button onClick={handleDelete}>Add Comments</Button>
      </div>
    </Container>
  );
  }

export default ViewRecipe;