import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { BACKEND_URL } from '../../config';
import { notify } from '../NotificationProvider/NotificationUtils';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');

  const navigate = useNavigate();

  const availableTags = ['Array', 'String', 'Map', 'LinkedList', 'Db'];

  const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(1, { message: 'Name is required' }),
    skillLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], { message: 'Select a valid skill level' }),
    interests: z.array(z.string()).nonempty({ message: 'At least one interest is required' }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = registerSchema.safeParse({ email, password, name, skillLevel, interests });
      if (!result.success)
      {
        result.error.errors.forEach(err => notify.error(err.message));
        return;
        }
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        email,
        password,
        name,
        skillLevel,
        interests,
      });
      notify.success(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => notify.error(err.message));
      } else {
        notify.error('Registration failed');
      }
    }
  };

  const addInterest = (interest) => {
    if (!interests.includes(interest) && interest) {
      setInterests([...interests, interest]);
    }
    setInterestInput('');
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select your skill level</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Interests</label>
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInterest(interestInput);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="mt-2">
              {availableTags
                .filter((tag) => tag.toLowerCase().includes(interestInput.toLowerCase()) && !interests.includes(tag))
                .map((tag) => (
                  <div
                    key={tag}
                    onClick={() => addInterest(tag)}
                    className="cursor-pointer inline-block px-2 py-1 m-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                  >
                    {tag}
                  </div>
                ))}
            </div>
            <div className="mt-2">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="inline-flex items-center px-2 py-1 m-1 bg-blue-200 dark:bg-blue-700 rounded-full"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 text-red-500 dark:text-red-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 dark:bg-slate-200 dark:text-slate-900 py-2 px-4 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-600 hover:text-white dark:hover:text-white focus:outline-none focus:ring focus:border-blue-300 text-white">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account? <Link to="/login" className="dark:text-white hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
