import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  return new URL(url).searchParams.get('v');
}

export default function ExercisePage() {
  const [exercise, setExercise] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercise data from your server using Axios
    Axios.get(`http://localhost:3001/exercise/${id}`)
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={true} onHide={() => navigate(-1)}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <img src={exercise.image} alt={exercise.name} style={{ width: '80%' }} />
      <p>Level: {exercise.lvl}</p>
      {exercise.categories.map((category, index) => (
          <div key={index}>
            <img src={category.image} alt={category.name} onClick={() => navigate(`/category/${category._id}`)} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
          </div>
        ))}
      <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(exercise.video)}`} title="Video Preview" width="320" height="240" />
        <p>Video: <a href={exercise.video}>Video External Link</a></p>
        <p>Technique Summary: {exercise.techniqueSummary}</p>
        <p>Description: {exercise.description}</p>
      </Modal.Body>
    </Modal>
  );
}