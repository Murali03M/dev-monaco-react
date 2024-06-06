import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`/api/challenges/${id}`);
        setChallenge(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallenge();
  }, [id]);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
      <div>{challenge.content}</div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Test Cases</h3>
        <ul>
          {challenge.testCases.map((testCase) => (
            <li key={testCase.id} className="mb-2">
              <div>Input: {testCase.input}</div>
              <div>Output: {testCase.output}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeDetail;
