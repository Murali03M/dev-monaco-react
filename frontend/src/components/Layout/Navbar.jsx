import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (token) {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [token]);


  const logOutHandler = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0">
              <Link to='/' className="text-xl font-bold text-gray-900 dark:text-white">DEV</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeProvider />
            <Menu as="div" className="relative">
              <div>
                {token ? (
                  <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="h-6 w-6 text-black dark:text-white" />
                  </Menu.Button>
                ) : (
                  <Link
                    to="/login"
                    className="dark:text-white hover:text-white border border-gray-900 dark:border-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    Login
                  </Link>
                )}
              </div>
              {user && (
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        }`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        }`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  {user.role === "ADMIN" && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/create-challenge"
                          className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                            active ? 'bg-gray-100 dark:bg-gray-600' : ''
                          }`}
                        >
                          Create Challenge
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={logOutHandler}
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        }`}
                      >
                        Logout
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-9 w-9 dark:text-white text-black "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
