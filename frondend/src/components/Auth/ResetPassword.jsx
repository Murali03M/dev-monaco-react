import  { useState } from 'react';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { z } from 'zod';
import { notify } from '../NotificationProvider/NotificationUtils';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const resetSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  });

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const result = resetSchema.safeParse({ email, password });
      if (!result.success) {
        result.error.errors.forEach(err => notify.error(err.message));
        return;
      }
      console.log("res",result);
      const response = await axios.patch(`${BACKEND_URL}/api/v1/auth/reset-password`,result.data);

      notify.success(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notify.error(error.response.data.message);
      } else {
        notify.error('Password reset failed');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reset Password</h2>
        <form onSubmit={updateHandler}>
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
            className="w-full bg-slate-900 dark:bg-slate-200 dark:text-slate-900 py-2 px-4 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-600 hover:text-white dark:hover:text-white focus:outline-none focus:ring focus:border-blue-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
