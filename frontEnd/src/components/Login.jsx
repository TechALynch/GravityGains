import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful, you can redirect or perform any other action
        console.log('Login successful');
        navigate('/SkillsIndexPageHOME');
      } else {
        // Authentication failed
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
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
                  <h2 className="fw-bold mb-3 text-uppercase">GravityGains</h2>
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-dark-50 mb-5">Please enter your login and password!</p>
                    <Form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <Form.Control
                          type="email"
                          id="typeEmailX"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ width: '200px', fontSize: '12px' }}
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <Form.Control
                          type="password"
                          id="typePasswordX"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ width: '200px', fontSize: '12px' }}
                        />
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <Link to="/" className="text-dark-50">
                          Forgot password?
                        </Link>
                      </p>
                      <Button variant="outline-dark" type="submit" className="btn-lg px-5">
                        Login
                      </Button>
                    </Form>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-dark">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-dark">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-dark">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{' '}
                    </p>
                      <p>
                      <Link to="/SignUp" className="text-dark-50 fw-bold">
                        Sign Up
                      </Link>
                      </p>
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
