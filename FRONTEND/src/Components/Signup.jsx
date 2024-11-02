import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        marginTop: 5,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" mb={3}>
        Signup
      </Typography>
      {success && <Alert severity="success">Signup successful!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSignup} style={{ width: '100%' }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.number}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Signup
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account? <Link style={{textDecoration: 'none'}} to="/">Login</Link>
      </Typography>
    </Box>
  );
};

export default Signup;
