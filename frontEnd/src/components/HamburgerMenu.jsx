import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HamburgerMenu() {
  return (
    <div className="hamburger-menu">
      <Navbar bg="light" expand="lg">
        {/* <Navbar.Brand href="#home"><FaBars /></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="custom-nav-link" href="/SkillsIndexPageHOME">Skills</Nav.Link>
            <Nav.Link className="custom-nav-link" href="/WorkoutIndexPage">Workouts</Nav.Link>
            <Nav.Link className="custom-nav-link" href="/ExerciseIndexPage">Exercises</Nav.Link>
            <NavDropdown title="Create" id="create-nav-dropdown">
              <NavDropdown.Item className="custom-nav-link" href="/CreateWorkout">Create Workout</NavDropdown.Item>
              <NavDropdown.Item className="custom-nav-link" href="/CreateExercise">Create Exercise</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="User Settings" id="user-settings-nav-dropdown">
              <NavDropdown.Item className="custom-nav-link" href="/ChangePassword">Change Password</NavDropdown.Item>
              <NavDropdown.Item className="custom-nav-link" href="/UserExercises">User Exercises</NavDropdown.Item>
              <NavDropdown.Item className="custom-nav-link" href="/UserWorkouts">User Workouts</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="custom-nav-link" href="/EquipmentGuide">Equipment Guide</Nav.Link>
            <Nav.Link className="custom-nav-link" href="/">Logout</Nav.Link>
            <hr></hr>
            <Nav.Link id='AboutDonate' className="custom-nav-link" href="/AboutDonate">About/Donate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HamburgerMenu;