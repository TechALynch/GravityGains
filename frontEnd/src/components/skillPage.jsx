import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import HamburgerMenu from './HamburgerMenu';

export default function SkillPage() {
  const [skill, setSkill] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch skill data from your server using Axios
    Axios.get(`http://localhost:3001/skills/${id}`)
      .then((response) => {
        setSkill(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skill:', error);
      });

    // Fetch workouts data from your server using Axios
    Axios.get('http://localhost:3001/workouts')
      .then((response) => {
        const fetchedWorkouts = response.data;

        // Fetch exercise data for each workout
        Promise.all(
          fetchedWorkouts.map((workout) =>
            Promise.all(
              workout.exerciseID.map((exerciseId) =>
                Axios.get(`http://localhost:3001/exercise/${exerciseId}`)
              )
            ).then((exercises) => ({
              ...workout,
              exercises,
            }))
          )
        ).then((workoutsWithExercises) => {
          setWorkouts(workoutsWithExercises);
        });
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error);
      });
  }, [id]);

  if (!skill || !workouts.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HamburgerMenu />
      <div style={{ overflowY: 'scroll', height: '100vh' }}>
        <Card border="secondary" style={{ width: '18rem' }}>
          <Card.Header>{skill.name}</Card.Header>
          {workouts.map((workout) => (
            <Card.Body key={workout._id}>
              <Card.Title>{workout.name}</Card.Title>
              <div style={{ display: 'flex', overflowX: 'scroll' }}>
                {workout.exercises.map((exercise, index) => (
                  <Link key={index} to={`/ExercisePage/${exercise.data._id}`}>
                    <img src={exercise.data.image} alt={exercise.data.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  </Link>
                ))}
              </div>
            </Card.Body>
          ))}
        </Card>
      </div>
    </>
  );
}