import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = `${import.meta.env.VITE_MAIN_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000; // 15 seconds timeout

// Request interceptor - add headers to all requests
axios.interceptors.request.use(
  (config) => {
    // Ensure credentials are always sent
    config.withCredentials = true;
    
    // Add headers if they don't exist
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle responses and errors
axios.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    // Log detailed error information
    if (error.response) {
      // Server responded with error status
      console.error('❌ API Error Response:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No Response from API:', {
        url: error.config?.url,
        message: 'Server did not respond. Check your internet connection or server status.'
      });
    } else {
      // Something else happened
      console.error('❌ Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axios;
