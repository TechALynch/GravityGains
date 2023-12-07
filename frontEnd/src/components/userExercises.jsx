import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HamburgerMenu from './HamburgerMenu';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UpdateExerciseForm from './updateExerciseForm';

export default function UserExercises() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all exercises from your server using axios
    axios.get('http://localhost:3001/exercises')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Define a function to handle the search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // Fetch the exercises that match the search query using axios
    axios.get(`http://localhost:3001/exercises/search?name=${e.target.value}`)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Define a function to handle the delete button click
  const handleDelete = async (id) => {
    // Confirm the deletion
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      // Delete the exercise from the database using axios
      try {
        await axios.delete(`http://localhost:3001/exercises/${id}`);
        // Remove the exercise from the state array
        setExercises(exercises.filter((exercise) => exercise._id !== id));
        // Show a success message
        alert('Exercise deleted successfully!');
      } catch (error) {
        // Show an error message
        console.error(error.message);
        alert('Something went wrong!');
      }
    }
  };

  // Define a function to handle the update button click
  const handleUpdate = (exercise) => {
    // Set the selected exercise to the state
    setSelectedExercise(exercise);
    // Show the modal
    setShow(true);
  };

  // Define a function to handle the modal close
  const handleClose = () => {
    // Hide the modal
    setShow(false);
    // Reset the selected exercise
    setSelectedExercise(null);
  };

  // Define a function to handle the modal submit
  const handleSubmit = async (e) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Get the form data from the event target
    const formData = new FormData(e.target);
    // Create an object with the form data
    const exercise = {
      image: formData.get('image'),
      name: formData.get('name'),
      lvl: formData.get('lvl'),
      video: formData.get('video'),
      techniqueSummary: formData.get('techniqueSummary'),
      description: formData.get('description'),
      categories: formData.getAll('categories'),
    };

    console.log('Updating exercise in the database:', exercise);

    // Update the exercise in the database using axios
    try {
      const response = await axios.put(
        `http://localhost:3001/exercise/${selectedExercise._id}`,
        exercise
      );
      console.log('Exercise updated successfully:', response.data);
      alert('Exercise updated successfully!');
      // Hide the modal
      setShow(false);
      // Reset the selected exercise
    //   setSelectedExercise(null);
      // Fetch the updated exercises from the database
      axios.get('http://localhost:3001/exercises')
        .then((response) => {
          setExercises(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      console.error('Error updating exercise:', error.message);
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      <HamburgerMenu />
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={handleSearchChange}
      />
      <div style={{ overflowY: 'auto', maxHeight: '75vh' }}>
        <Row xs={1} sm={2} md={3} className='g-4'>
          {exercises.map((exercise, idx) => (
            <Col key={idx}>
              <Card style={{ width: '18rem', height: '100%' }}>
                <Card.Img
                  variant='top'
                  src={exercise.image}
                  style={{ height: '100%' }}
                />
                <Card.Body>
                  <hr />
                  <Card.Title>{exercise.name}</Card.Title>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(exercise._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => handleUpdate(exercise)}
                    style={{ marginLeft: '10px' }}
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExercise && (
            <UpdateExerciseForm
              image={selectedExercise.image}
              name={selectedExercise.name}
              lvl={selectedExercise.lvl}
              video={selectedExercise.video}
              techniqueSummary={selectedExercise.techniqueSummary}
              description={selectedExercise.description}
              categories={selectedExercise.categories}
              handleOnSubmit={handleSubmit}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}