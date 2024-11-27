
import axios from 'axios';

// const baseURL = "http://localhost:8000";
const baseURL = "https://hajjrahh-backend-feg9fhcuhzbxd4a0.eastus-01.azurewebsites.net";

const axiosInstance = axios.create({
  baseURL, // Adjust to your backend URL
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

const getEmailPayload = () => {
  const userData = JSON.parse(localStorage.getItem('user_data'));
  if (userData && userData.email) {
    return { email: userData.email };
  }
}

const refreshToken = async (failedRequest) => {
  try {
    const response = await axiosInstance.post('/api/refreshToken', getEmailPayload());
    const { status, token } = response.data;
    if (status === 'success' && token) {
      // Save the new token in local storage or any other storage
      localStorage.setItem('access_token', token);
      // Update the failed request's headers with the new token
      // failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;
    }   
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Instantiate the interceptor

export const handleAPIData = async (method, url, payload = null) => {
  // const history = useHistory();
  console.log('payload', url, payload);
  try {
    let response;
    if (method === 'POST') {
      response = await axiosInstance.post(url, payload);
    } else if (method === 'GET') {      
      response = await axiosInstance.get(url);
    }

    console.log('hook response', response)
    if (!response.error && response.data) {
      return {
        data: response.data,
        status: 'success',
      }
    } else if (response.error) {
      return {
        data: response.data,
        status: 'success',
      }
    } else {
      const msg = `Error : ${url}`;
      return {
        status: 'error',
        message: msg
      }
    }
  } catch (error) {
    const msg = `Error : ${url}`;
    return {
      status: 'error',
      message: msg
    }
  }
};