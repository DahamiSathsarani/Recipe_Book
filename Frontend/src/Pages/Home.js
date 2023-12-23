import React from 'react';
import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Navigate to the Register route
        navigate('/Login');
      };

    const handleSignUp = () => {
        // Navigate to the StudentDetails route
        navigate('/Register');
    };
  return (
    <section class="con">
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
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
        
          <div className='button' >
            <Button variant="outline-primary" className='button1' onClick={handleSignIn}>SignIn</Button>
            <Button variant="outline-primary" className='button2' onClick={handleSignUp}>SignUp</Button>
          </div>
        </Container>
      </Navbar>
      <div class="container home">
        <Carousel>
          <Carousel.Item>
          <img class = "image" src='/Images/Home1.jpg' alt='home' />
            <Carousel.Caption className='caption'>
              <p>Best Recipes</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img class = "image" src='/Images/Home2.jpg' alt='home'/>
          </Carousel.Item>
          <Carousel.Item>
          <img class = "image" src='/Images/Home3.jpg' alt='home'/>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
}

export default Home;
