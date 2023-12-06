import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fName: '',
    lName: '',
  });

  const { email, password, fName, lName } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create a new user
      const response = await axios.post('http://localhost:3001/user/', formData);

      // Check if the user was created successfully
      if (response.status === 201) {
        console.log('User created successfully');
        alert('User Creation Successful!');

        // Navigate back to the login page
        navigate('/');
      } else {
        console.error('Error creating user');
        alert('User Creation Unsuccessful!');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginClick = () => {
    // Navigate to the Login page
    navigate('/');
  };

  return (
    <div className="container-fluid">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-light-gray text-dark rounded-3">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-dark-50 mb-5">Create a new account!</p>

                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="email" className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleChange}
                          style={{ width: '200px', fontSize: '12px' }}
                        />
                      </Form.Group>

                      <Form.Group controlId="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handleChange}
                          style={{ width: '200px', fontSize: '12px' }}
                        />
                      </Form.Group>

                      <Row className="mb-4">
                        <Col className="mb-4">
                          <Form.Group controlId="fName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your first name"
                              value={fName}
                              onChange={handleChange}
                              style={{ width: '200px', fontSize: '12px' }}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="lName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your last name"
                              value={lName}
                              onChange={handleChange}
                              style={{ width: '200px', fontSize: '12px' }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button variant="primary" type="submit" style={{ width: '50%' }}>
                        Sign Up
                      </Button>
                    </Form>

                    <div className="mt-4">
                      <p className="mb-0">
                        Already have an account?{' '}
                        {/* Use Link to navigate to the Login page */}
                        <Link to="/" className="text-dark-50 fw-bold" onClick={handleLoginClick}>
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
