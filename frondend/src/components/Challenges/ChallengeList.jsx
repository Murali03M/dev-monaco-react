import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import SearchBar from './SearchBar'; 
import Filter from './Filter'; 

const ChallengeList = () => {

  const navigate =useNavigate()
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/challenges`);
        setChallenges(response.data);
      } catch (error) {
        console.error(error);
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
    const matchesFilter = filter === 'All' || challenge.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Challenges</h2>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>
      <ul>
        {filteredChallenges.map((challenge) => (
          <li key={challenge.id} className="mb-4 border p-3 rounded shadow" onClick={()=>{ navigate(`/challenges/${challenge.id}`)}}>
            <div className="flex justify-between">
              <Link to={`/challenges/${challenge.id}`} className="text-blue-500 hover:underline text-xl font-bold">
                {challenge.title}
              </Link>
              <span className={`text-sm font-semibold ${challenge.category === 'EASY' ? 'text-green-500' : challenge.category === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'}`}>
                {challenge.category}
              </span>
            </div>
            <p className="mt-2 text-white">{challenge.description}</p>
            <div className="mt-2">
              {challenge.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
