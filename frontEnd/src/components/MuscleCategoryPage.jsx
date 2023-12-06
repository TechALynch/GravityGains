import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function MuscleCategoryPage() {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category data from your server using Axios
    Axios.get(`http://localhost:3001/category/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 0, right: 0 }}>Go Back</button>
      <h1>{category.name}</h1>
      <img src={category.image} alt={category.name} style={{ width: '100%' }} />
      <p>Description: {category.description}</p>
    </div>
  );
}