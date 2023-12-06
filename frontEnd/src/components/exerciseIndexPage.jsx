import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HamburgerMenu from './HamburgerMenu';
export default function ExerciseIndexPage() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all exercises from your server using Axios
    Axios.get('http://localhost:3001/exercises')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      <HamburgerMenu />
      <input type="text" placeholder="Search..." onChange={(e) => {
        Axios.get(`http://localhost:3001/exercises/search?name=${e.target.value}`)
          .then((response) => {
            setExercises(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }} />
      <div style={{ overflowY: 'auto', maxHeight: '75vh' }}>
        <Row xs={1} sm={2} md={3} className="g-4">
          {exercises.map((exercise, idx) => (
            <Col key={idx}>
              <Card onClick={() => navigate(`/exercise/${exercise._id}`)} style={{ width: '18rem', height: '100%' }}>
                <Card.Img variant="top" src={exercise.image} style={{ height: '100%' }} />
                <Card.Body>
                  <hr />
                  <Card.Title>{exercise.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}