import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import './ViewRecipe.css';

import { getRecipe } from '../../../API/Recipe_API';
import React, { useState, useEffect } from 'react';

function ViewRecipe() {
  // const navigate = useNavigate();

  const { state } = useLocation();
  const recipe = state?.recipe;
  const user = state?.user;

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  // Fetch recipe details
  useEffect(() => {
      
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(recipe);
        setIngredients(response.ingredientResult);
        setSteps(response.stepsNames);
        
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipe();
  }, [recipe]);

  // const handleFavorites = () => {
  //   try {
  //     const response = addToFav(user, recipe);
  //     console.log(response);
  //     if (response.success){
  //       alert("Successfully added to favorites");
  //     }
  //     else{
  //       alert("Failed adding to favorites");
  //     }
  //   } catch (error) {
  //     console.error('Error adding to favorites:', error);
  //   }
  // };

  const handleComments = () => {
    // Navigate to the Profile route
    
  };

  return (
    <Container className='ViewRecipe' fluid>
      <Row className='m-3 d-flex align-items-center'>
        <h2 >{recipe.title}</h2>
      </Row>
      <Row className='m-3 ViewRecipeMain'>
        <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
          <img className='ViewRecipeImage' src={recipe.imgUrl} alt='recipe.title'></img>
        </div>
        <div className='col-12 col-md-6'>
          <Button className='m-3 Button'>Add to Favourites</Button><br></br>
          <Button className='m-3 Button' onClick={handleComments}>Add Comments</Button>
        </div>
      </Row>
      <Row className='m-3'>
        <div className='col-12 col-md-6'>
          <div className='ViewRecipeContent'>
            <div className='d-flex align-items-center justify-content-center p-3'>
              <h2>You will need ?</h2>
            </div>
            <div className='d-flex align-items-center justify-content-center pb-5'>
              <div className='ViewRecipeItems'>
                {ingredients.map((item, index) => (
                  <div key={index} className='ViewRecipeItem'>
                    <div>
                      <strong>{item.ingredient_name} :</strong> {item.quantity} {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='ViewRecipeContent'>
            <div className='d-flex align-items-center justify-content-center p-3'>
              <h2>Let's make it..</h2>
            </div>
            <div className='d-flex align-items-center justify-content-center pb-5'>
              <div className='ViewRecipeItems'>
                {steps.map((item, index) => (
                  <div key={index} className='ViewRecipeItem'>
                    <div>
                      <h5>{index+1}. {item.step} </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Row> 
      <Row className='m-3'>
        
      </Row>
    </Container>
  );
  }

export default ViewRecipe;