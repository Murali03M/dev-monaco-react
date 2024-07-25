// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state as null
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');

    if (token && expiresAt) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expiresAt, 10)) { // Parse expiresAt as integer
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        setIsAuthenticated(false);
        navigate('/login');
      }
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
