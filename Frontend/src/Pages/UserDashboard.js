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
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from 'cdbreact';

import { getRecipes } from '../API/Recipe_API';
import { getRecipe } from '../API/Recipe_API';

function UserDashboard() {
    const { state } = useLocation();
    const user = state?.user;
    const chef = user.user;
    const firstName = chef.name.split(' ')[0];
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

    const handleProfile = () => {
        // Navigate to the Profile route
        navigate('/UserDashboard/Profile', { state: { user: user } });
    };

    const handleLogout = () => {
      // Navigate to the login route
      navigate('/Login');
    };

    const handleAddRecipe = async () => {
      try {
        navigate('/UserDashboard/AddRecipe', { state: { user: user }  });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
    };

    const handleRecipeLink = async (recipe) => {
      try {
        // Navigate to the recipe route
        navigate('/UserDashboard/ViewRecipe', { state: { recipe: recipe,  user: user} });
      } catch (error) {
        alert('An error occurred. Please try again..');
      }
    }

  return (
    <section className="UserDashboard">
      <Navbar expand="lg" className="bg-body-tertiary UserDashboardNav">
        <div className='UserDashboardNavbarTitle'>
          <Navbar.Brand href="#home" className='UserDashboardNavbarTitleBrand'>Recipe Book</Navbar.Brand>
        </div>
        <div className='UserDashboardNavbarLinks'>
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
        <div className='UserDashboardNavbarButton'>
          <div className='UserDashboardButton'>
            <Button className='UserDashboardButtonProfile' onClick={handleProfile}>{firstName}</Button>
            <Button className='UserDashboardButtonLogout' onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </Navbar>
      <Container className='UserDashboardContent'>
          {/* <CDBSidebar className="UserDashboardSideBar">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}> Recipe Book </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/myRecipes" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">My Recipes</CDBSidebarMenuItem>
                </NavLink>
                <NavLink onClick={handleProfile} activeClassName="activeClicked">
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
                style={{ padding: '20px 5px', }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar> */}
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
      <Row>
        <Button onClick={handleAddRecipe}>Add recipe</Button>
      </Row>
    </section>
    
  );
}

export default UserDashboard;
