// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');

    if (token && expiresAt) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expiresAt)) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
