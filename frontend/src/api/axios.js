import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',  // Replace with your backend URL
  withCredentials: true,  // Ensure credentials are sent with the request
  timeout: 5000,
});
