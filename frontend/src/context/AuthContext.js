import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Log the API URL to verify it's correct
const API_URL = process.env.REACT_APP_API_URL;
console.log('Current environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);

if (!API_URL) {
  console.error('REACT_APP_API_URL is not set!');
}

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to handle CORS
api.interceptors.request.use(
  (config) => {
    // Remove any existing CORS headers
    delete config.headers['Access-Control-Allow-Origin'];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounted');
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      console.log('No token found, setting loading to false');
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking auth status...');
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/api/auth/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Auth check response:', response.data);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login...');
      const response = await api.post(
        '/api/auth/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      console.log('Login response:', response.data);
      
      const { token, user: userData } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Store token
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user data directly from login response
      if (userData) {
        console.log('Setting user data from login response:', userData);
        setUser(userData);
        return { success: true };
      } else {
        // If no user data in response, try to extract from token
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const userData = {
            _id: tokenData.userId,
            email: email // We can use the email from the login request
          };
          console.log('Extracted user data from token:', userData);
          setUser(userData);
          return { success: true };
        } catch (error) {
          console.error('Failed to extract user data from token:', error);
          throw new Error('Failed to get user data');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (email, password) => {
    try {
      console.log('Attempting registration...');
      const response = await api.post(
        '/api/auth/register',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      console.log('Registration response:', response.data);
      
      const { token, user: userData } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Store token
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user data
      if (userData) {
        console.log('Setting user data:', userData);
        setUser(userData);
        return { success: true };
      } else {
        throw new Error('No user data in registration response');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) {
    console.log('AuthProvider is loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log('Current user state:', user);
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};