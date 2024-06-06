import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate =useNavigate()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
     <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to the Challenge Platform</h1>
        <div className="flex justify-center items-center mt-3">
        <button onClick={()=>{navigate('/challenges')}} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow ">Explore</button>

        </div>
      </div>
    </div>
  );
};

export default Home;
