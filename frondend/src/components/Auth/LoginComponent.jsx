import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { BACKEND_URL } from '../../config';

import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../NotificationProvider/NotificationUtils';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = loginSchema.safeParse({ email, password });
      if (!parsedData.success) {
        const errors = parsedData.error.formErrors.fieldErrors;
        for (const key in errors) {
          errors[key].forEach(err => notify.error(err));
        }
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        notify.success("Login successful");
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        notify.error(error.response.data.error);
      } else {
        notify.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Don't have an account? <Link to="/register" className="text-white hover:underline">Sign up</Link>
          </p>
        </div>
 
      </div>
    </div>
  );
};

export default LoginComponent;
