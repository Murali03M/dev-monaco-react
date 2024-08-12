import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

 
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-500 dark:hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-500 dark:hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-500 dark:hover:text-gray-300">Contact</Link>
          <Link to="/survey" className="hover:text-gray-500 dark:hover:text-gray-300">Survey</Link>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;
