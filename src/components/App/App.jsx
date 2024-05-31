import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import ContactList from '../ContactList/ContactList';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { fetchCurrent } from '../../redux/slices/authSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchCurrent());
  }, [dispatch]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
