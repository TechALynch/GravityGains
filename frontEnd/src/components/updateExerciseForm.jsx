
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function UpdateExerciseForm(props) {
  // Define the state variables for the form fields
  const [image, setImage] = useState(props.image || '');
  const [name, setName] = useState(props.name || '');
  const [lvl, setLvl] = useState(props.lvl || '');
  const [video, setVideo] = useState(props.video || '');
  const [techniqueSummary, setTechniqueSummary] = useState(
    props.techniqueSummary || ''
  );
  const [description, setDescription] = useState(props.description || '');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    props.categories || []
  );

  // Define a function to fetch the categories from the database
  const fetchCategories = async () => {
    try {
      console.log('Fetching categories from the database...');
      const response = await axios.get('http://localhost:3001/categories');
      console.log('Categories fetched successfully:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  // Call the fetchCategories function when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Define a function to handle the category checkbox change
  const handleCategoryChange = (e) => {
    // Get the checked status and the value of the checkbox
    const checked = e.target.checked;
    const value = e.target.value;

    // If the checkbox is checked, add the value to the selectedCategories array
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      // If the checkbox is unchecked, remove the value from the selectedCategories array
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  };

  // Return the JSX code for the form
  return (
    <div className='UpdateExerciseForm'>
      <h1>{props.title}</h1>
      <Form onSubmit={props.handleOnSubmit}>
        <Form.Group controlId='image'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='name'>
          <Form.Label>Exercise Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter exercise name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='lvl'>
          <Form.Label>Exercise Level</Form.Label>
          <Form.Control
            as='select'
            value={lvl}
            onChange={(e) => setLvl(e.target.value)}
          >
            <option value=''>Select a level</option>
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='video'>
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter video URL'
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='techniqueSummary'>
          <Form.Label>Technique Summary</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter technique summary'
            value={techniqueSummary}
            onChange={(e) => setTechniqueSummary(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='categories'>
          <Form.Label>Categories</Form.Label>
          <div className='category-checkboxes'>
            {categories.map((category) => (
              <Form.Check
                key={category._id}
                type='checkbox'
                label={category.name}
                value={category._id}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category._id)}
              />
            ))}
          </div>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateExerciseForm;