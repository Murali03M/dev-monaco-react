import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { BACKEND_URL } from '../../config';
import { notify } from '../NotificationProvider/NotificationUtils';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');

  const navigate = useNavigate();

  const availableTags = ['Array', 'String', 'Map', 'LinkedList', 'Db'];

  const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(1, { message: 'Name is required' }),
    skillLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], { message: 'Select a valid skill level' }),
    interests: z.array(z.string()).nonempty({ message: 'At least one interest is required' }),
  });
    
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/auth/getuser`, {
              headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const { email, name, skillLevel, interests } = response.data;
        setEmail(email);
        setName(name);
        setSkillLevel(skillLevel);
        setInterests(interests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      registerSchema.parse({ email, confirmPassword, name, skillLevel, interests });

      const updateData = {};
      if (email) updateData.email = email;
      if (name) updateData.name = name;
      if (skillLevel) updateData.skillLevel = skillLevel;
      if (interests) updateData.interests = interests;

        const response = await axios.patch(`${BACKEND_URL}/api/v1/auth/updateuser`, updateData,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
          }
      );
      notify.success(response.data.message);
      navigate('/profile');
    } catch (error) {
      if (error instanceof z.ZodError) {
          error.errors.forEach(err => notify.error(err.message));
          
      } else {
          notify.error('Update failed');
          
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Update Details</h2>
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
            Update
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            <Link to="/profile" className="dark:text-white hover:underline">Go back to profile</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
