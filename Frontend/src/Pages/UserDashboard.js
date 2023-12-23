import React, { useState, useEffect } from 'react';
import './UserDashboard.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { getRecipes } from '../API/Recipe_API';
import { getRecipe } from '../API/Recipe_API';

function UserDashboard() {
    const { state } = useLocation();
    const user = state?.user;
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);

    // Fetch recipes
    useEffect(() => {
      
      const fetchRecipes = async () => {
        try {
          const response = await getRecipes();
          
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
    }, []);

    console.log("recipe",recipes);

    const handleProfile = () => {
        // Navigate to the Profile route
        navigate('/UserDashboard/Profile', { state: { user: user } });
    };

    const handleAddRecipe = () => {
      // Navigate to the Profile route
      navigate('/UserDashboard/AddRecipe', { state: { user: user } });
    };

    const handleRecipeLink = async (recipe) => {

      try {
        const response = await getRecipe(recipe);
        console.log("response:", response);

        // Navigate to the recipe route
        navigate('/UserDashboard/ViewRecipe', { state: { recipe: recipe } });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
    }

  return (
    <Container className="UserDashboard" fluid>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary UserDashboardNav">
        <Container>
          <Navbar.Brand href="#home">Recipe Book</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-center'>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#about">Category</Nav.Link>
              <Nav.Link href="#contact">Chefs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className='UserDashboardButton' >
            <Button variant="outline-primary" className='UserDashboardButtonProfile' onClick={handleProfile}>Profile</Button>
            <Button variant="outline-primary" className='UserDashboardButtonAddRecipe' onClick={handleAddRecipe}>Add Recipe</Button>
          </div>
        </Container>
      </Navbar>
      <div className='UserDashboardContent'>
        <div className='UserDashboardContent'>
          <CDBSidebar className="UserDashboardSideBar">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Recipe Book
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/myRecipes" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">My Recipes</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/favourites" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="heart">Favourites</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/settings" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="cog">Settings</CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
          <Container>
            <Row xs={1} md={2} lg={5} className="g-4 mt-3 UserDashboardCardRow">
              {recipes.map((recipe) => (
                <Col key={recipe._id}>
                  <Card className='UserDashboardCard' onClick={() => handleRecipeLink(recipe)}>
                    <Link>
                      <Card.Img variant="top" src={recipe.imgUrl} alt={recipe.title} />
                    </Link>
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      {/* Add other details like category, etc. if needed */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </Container>
    
  );
}

export default UserDashboard;
