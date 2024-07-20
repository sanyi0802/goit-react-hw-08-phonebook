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
    handleError(error);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post('/users/login', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('/users/logout');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Funciones para manejar contactos
export const fetchContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axios.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteContact = async (contactId) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateContact = async (contactId, updateData) => {
  try {
    const response = await axios.patch(`/contacts/${contactId}`, updateData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Manejo de errores
function handleError(error) {
  if (error.response) {
    console.error('Error response:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('Error request:', error.request);
    throw new Error('No response received from the server');
  } else {
    console.error('Error message:', error.message);
    throw new Error(error.message);
  }
}
