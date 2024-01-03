import React, { useState, useEffect } from 'react';
import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
// import Row from 'react-bootstrap/Row';
// import Anchor from 'react-bootstrap/Anchor';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { useNavigate } from 'react-router-dom';

import { getCategories } from '../API/Category_API';
import { getCategorizedRecipes } from '../API/Recipe_API';

function Home() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    // Fetch categories
    useEffect(() => {
      
      const fetchCategories = async () => {
        try {
          const response = await getCategories();
          
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

    const handleCategories = async (category_id) => {
      try {
          const response = await getCategorizedRecipes(category_id);
          console.log(response);
            // Navigate to the categorized recipes route
            navigate('/Categories', { state: { recipes: response } });
  
        } catch (error) {
          alert('An error occurred. Please try again..');
        }
    };

    const handleSignIn = () => {
        // Navigate to the Register route
        navigate('/Login');
      };

    const handleSignUp = () => {
        // Navigate to the StudentDetails route
        navigate('/Register');
    };
  return (
    <section className=''>
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
              <NavDropdown title="Categories" id="basic-nav-dropdown" className='UserDashboardNavbarLinksNav'>
                {categories.map(category => (
                  <NavDropdown.Item key={category._id} onClick={() => handleCategories(category.category_id)}> {category.category_name} </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link href="#contact" className='UserDashboardNavbarLinksNav'>Chefs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className='UserDashboardNavbarButton'>
          <div className='UserDashboardButton'>
            <Button className='HomeSignIn' onClick={handleSignIn}>Sign In</Button>
            <Button className='HomeSignUp' onClick={handleSignUp}>Sign Up</Button>
          </div>
        </div>  
      </Navbar>
      <Container className="Home" fluid>
        <Carousel>
          <Carousel.Item>
          <img className = "HomeImage" src='/Images/Home1.jpg' alt='home'/>
            <Carousel.Caption className='HomeImageCaption'>
              <p>Best Recipes</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className = "HomeImage" src='/Images/Home2.jpg' alt='home'/>
          </Carousel.Item>
          <Carousel.Item>
          <img className = "HomeImage" src='/Images/Home3.jpg' alt='home'/>
          </Carousel.Item>
        </Carousel>
      </Container>
      {/* <Container className='Services mt-5'>
        <Row>
          <div className='ServicesHeader'>
            <h1>Our Services</h1>
          </div>
        </Row>
        <Row className='m-3 ServicesContent'>
          <div className='col-md-4'>
            <h1>Explore best recipes</h1>
            <h1>Explore best recipes</h1>
          </div>
          <div className='col-md-4'>
          <h1>Explore best recipes</h1>
          <h1>Explore best recipes</h1>
          </div>
          <div className='col-md-4'>
          <h1>Explore best recipes</h1>
          <h1>Explore best recipes</h1>
          </div>
        </Row>
      </Container> */}
    </section>
  );
}

export default Home;
