import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { Button, Box, Typography } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography>{user.email}</Typography>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;
