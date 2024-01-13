import './CategorizedRecipes.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { getCategory } from '../../../API/Category_API';

function CategorizedRecipes() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const recipes = state?.recipes;
    const category_id = state?.category_id;

    // Fetch category name
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        const fetchCategoryName = async () => {
          try {
            const response = await getCategory(category_id);
            const categoryName = response.category_name;
            setCategoryName(categoryName);
            
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
        fetchCategoryName();
    }, [category_id]);

    const [name, setName] = useState();

    const handleRecipeLink = async (recipe) => {
      try {
        // Navigate to the recipe route
        navigate('/UserDashboard/ViewRecipe', { state: { recipe: recipe } });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
    }

  return (
    <section className="UserDashboard">
      <Navbar expand="lg" className="bg-body-tertiary UserDashboardNav">
        <div className='CategorizedRecipesNavbarTitle'>
          <Navbar.Brand href="#home" className='UserDashboardNavbarTitleBrand'>Recipe Book</Navbar.Brand>
        </div>
        <div className='CategorizedRecipesNavbarLinks'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-center'>
            <Nav>
              <Nav.Link href="#home" className='UserDashboardNavbarLinksNav'>Home</Nav.Link>
              <Nav.Link href="#services" className='UserDashboardNavbarLinksNav'>Services</Nav.Link>
              <Nav.Link href="#about" className='UserDashboardNavbarLinksNav'>Category</Nav.Link>
              <Nav.Link href="#contact" className='UserDashboardNavbarLinksNav'>Chefs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className='CategorizedRecipesNavBarSearch'>
          <form>
            <input
              type="text" id="name" name="name"
              className='CategorizedRecipesSerachInput'
              placeholder='search here'
              autoFocus
              onChange={(e) => setName(e.target.value)}>
            </input>
          </form>
          <Button>Search</Button>
        </div>
      </Navbar>
      <Container className='CategorizedRecipesContent'>
        <Row className='CategorizedRecipesHeader m-3'>
            <h1>{ categoryName }</h1>
        </Row>
        <Row xs={1} md={3} lg={6} className="g-4 mt-3 ">
            {recipes.map((recipe) => (
              <Col key={recipe._id}>
                <Card className='UserDashboardCard' onClick={() => handleRecipeLink(recipe)}>
                  <Link className='UserDashboardCardLink'>
                    <Card.Img variant="top" src={recipe.imgUrl} alt={recipe.title} className='UserDashboardCardImage'/>
                  </Link>
                  <Card.Body className='UserDashboardCardBody d-flex align-items-center justify-content-center'> 
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
    
  );
}

export default CategorizedRecipes;
