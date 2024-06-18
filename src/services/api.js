import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

axios.defaults.baseURL = API_URL;

// Funciones para manejar el token de autorización
export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// Funciones de autenticación
export const register = async (userData) => {
  try {
    const response = await axios.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post('/users/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('/users/logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error.response?.data || error.message);
    throw error;
  }
};

// Funciones para manejar contactos
export const fetchContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error.response?.data || error.message);
    throw error;
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axios.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error.response?.data || error.message);
    throw error;
  }
};

export const updateContact = async (contactId, updateData) => {
  try {
    const response = await axios.patch(`/contacts/${contactId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error.response?.data || error.message);
    throw error;
  }
};
