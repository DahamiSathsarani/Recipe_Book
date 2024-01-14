import React, { useState, useEffect } from 'react';
import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Anchor from 'react-bootstrap/Anchor';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
// import { FaCheckCircle } from 'react-icons/fa';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { useNavigate } from 'react-router-dom';

import { getCategories } from '../API/Category_API';
import { getCategorizedRecipes } from '../API/Recipe_API';
import { createSubscription } from '../API/Subscription_API';

function Home(props) {
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
            navigate('/Categories', { state: { recipes: response, category_id: category_id } });
  
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

    const [show, setShow] = useState(false);
    // const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setEmail] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubscribe = async () => {
      try{
        const response = await createSubscription(email);
        
        if(response.data.message === "Successfully Subscribed"){
          alert("Successfully Subscribed !");
        }else if(response.data.message === "Already Subscribed"){
          alert("Already Subscribed !");
        }else{
          alert("Error subscribing")
        }
      }catch{
        alert('An error occurred. Please try again..');
      }
    }

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
              <Nav.Link href="#Home" className='UserDashboardNavbarLinksNav'>Home</Nav.Link>
              <Nav.Link href="#Services" className='UserDashboardNavbarLinksNav'>Services</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown" className='UserDashboardNavbarLinksNav'>
                {categories.map(category => (
                  <NavDropdown.Item key={category._id} onClick={() => handleCategories(category.category_id)}> {category.category_name} </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link href="#Chef" className='UserDashboardNavbarLinksNav'>Chefs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className='HomeNavbarButton'>
          <div className='HomeButton'>
            <Button className='HomeSignIn' onClick={handleSignIn}>Sign In</Button>
            <Button className='HomeSignUp' onClick={handleSignUp}>Sign Up</Button>
          </div>
        </div>  
      </Navbar>
      <Container className="Home" id='Home' fluid>
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
      <Container className='mt-5'>
        <Row>
          {categories.map((category) => (
            <Col key={category._id}>
              <Card className='CategoryCard' onClick={() => handleCategories(category.category_id)}>
                <Card.Body className='CategoryCardBody d-flex align-items-center justify-content-center'> 
                  <Card.Title>{category.category_name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className='Services mt-5' id='Services'>
        <Row>
          <div className='ServicesHeader'>
            <h1>Our Services</h1>
          </div>
        </Row>
        <Row className='m-3 ServicesContent'>
          <div className='col-md-3'>
            <Anchor className='ServicesAnchor'>
              <h3>Recipe Search</h3>
              <p>Find delicious recipes based on your preferences.</p>
            </Anchor>
          </div>
          <div className='col-md-3'>
            <Anchor className='ServicesAnchor' href=''>
              <h3>User Accounts</h3>
              <p>Create an account to save your favorite recipes and interact with the community.</p>
            </Anchor>
          </div>
          <div className='col-md-3'>
            <Anchor className='ServicesAnchor'>
              <h3>Community Interaction</h3>
              <p>Join the conversation, ask questions, and share your cooking experiences in our community forum.</p>
            </Anchor>
          </div>
          <div className='col-md-3'>
            <Anchor className='ServicesAnchor' onClick={handleShow}>
              <h3>Newsletter Subscription</h3>
              <p>Subscribe to our newsletter for updates, new recipes, and cooking tips.</p>
            </Anchor>
          </div>
        </Row>

        <Modal show={show} onHide={handleClose} className='SubscriptionModal'
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Newsletter Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  id='email'
                  type="email"
                  placeholder="name@gmail.com"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {handleSubscribe(); handleClose();}} className='SubscribeButton'>
              Subscribe
            </Button>
          </Modal.Footer>
        </Modal>

        

      </Container>
    </section>
  );
}

export default Home;
