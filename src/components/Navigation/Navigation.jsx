import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Phonebook
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={NavLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/contacts">
                Contacts
              </Button>
              <UserMenu />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
