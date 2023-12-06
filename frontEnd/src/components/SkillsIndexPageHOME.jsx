import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import HamburgerMenu from './HamburgerMenu';

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
      <HamburgerMenu />
      <div className="SkillsIndexContainer d-flex flex-wrap justify-content-center">
        {skills.map((skill) => (
          <Link key={skill._id} to={`/SkillPage/${skill._id}`}>
            <Card
              id="card-flex"
              className="my-2"
              text="Black"
              style={{
                padding: '10px 10px 10px 10px',
                paddingRight: '25px',
                margin: '10px', // Added margin between cards
                height: '125px',
                width: '18rem',
                backgroundColor: '#f5fdff9c', // LightGrey background color
                border: '2px solid #000', // Black border
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Box shadow
              }}
            >
              <Card.Body className="card-body-flex">
                <Card.Img
                  src={skill.image}
                  style={{
                    height: '120px',
                    width: '120px',
                    objectFit: 'cover',
                    borderRadius: '25%', // Make the image round
                  }}
                />
              </Card.Body>
              <Card.Header
                style={{
                  fontSize: '15px',
                  height: '120px',
                  width: '120px',
                }}
              >
                {skill.name}
              </Card.Header>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
