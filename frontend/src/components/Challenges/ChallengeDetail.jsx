import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ChallengeStatement from './ChallengeStatement';
import ChallengeSubmitBar from './ChallengeSubmitBar';
import { BACKEND_URL } from '../../config';
import Footer from '../../pages/footer';

const ChallengeDetail = () => {

 
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/challenges/${id}`);
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
    <div>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-2 md:py-6 grid md:grid-cols-2 gap-2">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 ">
          <ChallengeStatement description={challenge.description} />
        </div>
        <ChallengeSubmitBar challenge={challenge} />
      </main>
      </div>
      <Footer/>
      </div>
  );
};

export default ChallengeDetail;
