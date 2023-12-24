import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createRecipe } from '../../../API/Recipe_API';
import { getCategories } from '../../../API/Category_API';
// import { getIngredients } from '../../../API/Ingredient_API';

import './AddRecipe.css';

import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

function AddRecipe() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const user = state?.user;
  const chef = user.user;

  const [categories, setCategories] = useState([]);
  // const [ingredients, setIngredients] = useState([]);

  // Fetch categories
  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log(response);
        
        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error(`Failed to fetch categories. ${response.error}`);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    description: [''],
    category_name: '',
    recipePic: null,
  });

  const handleChange = (e, index) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;
  
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: fieldValue,
      });
    } else if (name === 'name' || name === 'quantity' || name === 'unit') {
      const newIngredients = [...formData.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [name]: fieldValue,
      };
      setFormData({
        ...formData,
        ingredients: newIngredients,
      });
    } else if (name === 'description') {
      const newDescription = [...formData.description];
      newDescription[index] = fieldValue;
      setFormData({
        ...formData,
        description: newDescription,
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
        const response = await createRecipe(formData, chef.user_id);

        if (response.data.success) {
          // Data was successfully registered
          alert("Added Successful")
          // Navigate to the StudentDetails route
          navigate('/UserDashboard');

        } else {
          alert('Adding recipe failed. Please try again.');
        }
      } catch (error) {
        console.error('Error adding recipe:', error);
        alert('An error occurred. Please try again..');
      }
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }] });
  };

  const removeIngredient = () => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients];
      newIngredients.pop();
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const addDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  const removeDescription = (index) => {
    if (formData.description.length > 1) {
      const newDescription = [...formData.description];
      newDescription.splice(index, 1);
      setFormData({ ...formData, description: newDescription });
    }
  };

  return (
    <Container className='AddRecipe' fluid>
      <div className='AddRecipeContent' fluid>
        <h2 className='AddRecipeh2'>Add Recipe</h2>
        <form onSubmit={handleSubmit} className='AddRecipeForm'>
          <div className='AddRecipeDiv'>
          <label htmlFor="title" className='AddRecipeLabel'>Title : </label>
          <div className='AddRecipeInputDiv'>
            <div className='AddRecipeInputDiv1'>
              <input className= "AddRecipeInput" type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
            </div>
          </div>
      
          </div>
          <div className='AddRecipeDiv'>
            <label htmlFor="ingredients" className='AddRecipeLabel'>Ingredients :</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className= "AddRecipeInputDiv">
                <div className='AddRecipeInputDiv1'>
                  <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Ingredient Name"
                    required
                    className='AddRecipeInputIngredient'
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Quantity"
                    className='AddRecipeInputIngredient'
                  />
                  <input
                    type="text"
                    name="unit"
                    value={ingredient.unit}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Unit"
                    className='AddRecipeInputIngredient'
                  />
                </div>
                <div className='AddRecipeInputDiv2'>
                  {index === formData.ingredients.length - 1 && (
                    <>
                      <Button type="button" onClick={addIngredient} className='AddRecipeInputButton'> + </Button>
                      <Button type="button" onClick={removeIngredient} className='AddRecipeInputButton'> - </Button>
                    </>
                  )}
                </div>
                
              </div>
            ))}
          </div>
          <div className='AddRecipeDiv'>
            <label className='AddRecipeLabel'>Description :</label>
            {formData.description.map((description, index) => (
              <div key={index} className='AddRecipeInputDiv'>
                <div className='AddRecipeInputDiv1'>
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Add description"
                    required
                    className='AddRecipeInput'
                  />
                </div>
                <div className='AddRecipeInputDiv2'>
                  {index === formData.description.length - 1 && (
                    <>
                      <Button type="button" onClick={addDescription} className='AddRecipeInputButton'> + </Button>
                      <Button type="button" onClick={() => removeDescription(index)} className='AddRecipeInputButton'> - </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='AddRecipeDiv'>
            <label htmlFor="category_name" className='AddRecipeLabel'>Category :</label>
            <div className='AddRecipeInputDiv'>
              <select id="category_name" name="category_name" value={formData.category_name} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='AddRecipeDiv'>
            <label htmlFor="recipePic" className='AddRecipeLabel'>Upload picture : </label>
            <input type='file' id="recipePic" name="recipePic" onChange={handleChange} ></input>
          </div>
          <div className='AddRecipeDiv'>
            <Button type="submit" className='AddRecipeButton'>Add</Button>
          </div>
        </form>
      </div>
      
    </Container>
  );
}

export default AddRecipe;
