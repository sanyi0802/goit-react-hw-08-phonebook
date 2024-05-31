import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';

const LoginForm = () => {
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
      await dispatch(loginUser({ email, password })).unwrap();
      setMessage('Login successful!');
      setSeverity('success');
      setOpen(true);
      navigate('/contacts');
    } catch (err) {
      setMessage(err.message || 'Login failed');
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
              {isLoading ? 'Logging in...' : 'Login'}
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

export default LoginForm;
