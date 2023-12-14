import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUserById = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '657b290e16f83b328fe7c052',
      },
    };
    try {
      const response = await fetch(`https://dummyapi.io/data/v1/user/${id}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        // Set default values once user data is fetched
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
        });
      } else {
        console.error('Failed to fetch user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '657b290e16f83b328fe7c052',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      }),
    };
  
    try {
      const response = await fetch(`https://dummyapi.io/data/v1/user/${id}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        history('/list');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
        });
      } else {
        console.error('Failed to create user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUser;
