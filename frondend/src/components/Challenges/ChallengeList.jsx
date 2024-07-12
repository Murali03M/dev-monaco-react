import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import SearchBar from './SearchBar';
import Filter from './Filter';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/challenges`);
        setChallenges(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'All' || challenge.difficulty === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Challenges</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Explore our collection of programming challenges.
          </p>
        </div>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
          <Filter onFilter={handleFilter} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <ChallengeCardSkeleton key={index} />
            ))
          ) : (
            filteredChallenges.map((challenge) => (
              <ChallengeCard challenge={challenge} key={challenge.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};



const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" onClick={() => navigate(`/challenges/${challenge.id}`)}>
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{challenge.title}</h3>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-semibold ${challenge.category === 'EASY' ? 'text-green-500' : challenge.category === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'}`}>
            {challenge.difficulty}
          </span>
          {/* <div className="flex space-x-2">
            {challenge.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                #{tag}
              </span>
            ))}
          </div> */}
        </div>
        <div className="mt-4">
          <Link to={`/challenges/${challenge.id}`} className="text-blue-500 hover:underline">
            View Challenge
          </Link>
        </div>
      </div>
    </div>
  );
};

const ChallengeCardSkeleton = () => {
  return (
    <div className="cursor-pointer border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-pulse">
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeList;
