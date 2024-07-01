import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',  // Replace with your backend URL
  withCredentials: true  // Ensure credentials are sent with the request
});

export default instance;
