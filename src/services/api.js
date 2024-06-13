import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

axios.defaults.baseURL = API_URL;

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = async (userData) => {
  const response = await axios.post('/users/signup', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post('/users/login', userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/users/logout');
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await axios.get('/users/current');
  return response.data;
};


export const fetchContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

export const addContact = async (contactData) => {
  const response = await axios.post('/contacts', contactData);
  return response.data;
};

export const deleteContact = async (contactId) => {
  const response = await axios.delete(`/contacts/${contactId}`);
  return response.data;
};

export const updateContact = async (contactId, updateData) => {
  const response = await axios.patch(`/contacts/${contactId}`, updateData);
  return response.data;
};
