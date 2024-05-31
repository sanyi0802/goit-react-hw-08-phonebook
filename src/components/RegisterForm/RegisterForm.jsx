import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      setMessage('Registration successful!');
      setSeverity('success');
      setOpen(true);
      navigate('/login');
    } catch (err) {
      setMessage(err.message || 'Registration failed');
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Box>
        </form>
      </Box>
      <Notification
        message={message}
        severity={severity}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default RegisterForm;
