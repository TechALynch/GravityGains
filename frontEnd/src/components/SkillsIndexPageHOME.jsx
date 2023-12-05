import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function SkillPage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills data from your server using Axios
    Axios.get('http://localhost:3001/skills')
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  return (
    <>
      {skills.map((skill) => (
        <Link key={skill._id} to={`/SkillPage/${skill._id}`}>
          <Card
            className="my-2"
            text="Black"
            style={{
              width: '18rem',
              backgroundColor: '#f5fdff9c', // LightGrey background color
              border: '2px solid #000', // Black border
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Box shadow
            }}
          >
            <Card.Header>{skill.name}</Card.Header>
            <Card.Body>
              <Card.Title as="h5">{skill.image}</Card.Title>
              {/* <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text> */}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </>
  );
}
