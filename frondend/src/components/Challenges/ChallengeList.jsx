import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/card";

import SearchBar from './SearchBar';
import Filter from './Filter';

export function Problems() {
  const navigate = useNavigate();
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
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the most popular programming problems on Code100x.
          </p>
        </div>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
          <Filter onFilter={handleFilter} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((problem) => (
            <ProblemCard problem={problem} key={problem.id} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ problem, navigate }) {
  return (
    <Card className="cursor-pointer" onClick={() => navigate(`/challenges/${problem.id}`)}>
      <CardHeader>
        <CardTitle>{problem.title}</CardTitle>
        <CardDescription>{problem.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
            <p>{problem.category}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Submissions</p>
            <p>{problem.solved}</p>
          </div>
        </div>
        <div className="mt-2">
          {problem.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <button navigate={`/challenges/${problem.id}`}>
          View Problem
        </button>
      </CardFooter>
    </Card>
  );
}
