import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="hamburger-menu">
      <button className="btn btn-light menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isOpen && (
        <nav className="menu-nav bg-light">
          <button className="btn btn-light close-button" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
          <ul className="menu-list list-unstyled">
            <li><Link className="text-dark text-decoration-none" to="/SkillsIndexPageHOME">Skills</Link></li>
            <li><Link className="text-dark text-decoration-none" to="/WorkoutIndexPage">Workouts</Link></li>
            <li><Link className="text-dark text-decoration-none" to="/ExerciseIndexPage">Exercises</Link></li>
            <li>
              <Link className="text-dark text-decoration-none" to="/CreatePage" onClick={() => setDropdownOpen(!isDropdownOpen)}>Create</Link>
              {isDropdownOpen && (
                <ul className="dropdown-list list-unstyled ps-3">
                  <li><Link className="text-dark text-decoration-none" to="/CreateWorkout">Create Workout</Link></li>
                  <li><Link className="text-dark text-decoration-none" to="/CreateExercise">Create Exercise</Link></li>
                </ul>
              )}
            </li>
            <li><Link className="text-dark text-decoration-none" to="/EquipmentGuide">Equipment Guide</Link></li>
            <li><Link className="text-dark text-decoration-none" to="/UserSettings">User Settings</Link></li>
          </ul>
          <ul id="AboutDonate" className="menu-list list-unstyled">
          <hr />
            <li><Link className="text-dark text-decoration-none" to="/AboutDonate">About/Donate</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;



// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// export default function NavForSearchExersise() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="ml-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Skills</Nav.Link>
//             <Nav.Link href="#action2">Workouts</Nav.Link>
//             <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }