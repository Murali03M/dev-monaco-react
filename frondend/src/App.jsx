
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';

import ChallengeList from './components/Challenges/ChallengeList';
import ChallengeDetail from './components/Challenges/ChallengeDetail';
import CreateChallenge from './components/Challenges/CreateChallenge';
import Profile from './components/User/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './components/Editor/CodeEditorLanding';

const App = () => {
  return (
    <Router>
      <Layout>
   
  
   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Register />} />
   <Route path="/challenges" element={<ChallengeList />} />
   <Route path="/challenges/:id" element={<ChallengeDetail />} />
   <Route path="/create-challenge" element={<CreateChallenge />} />
   <Route path="/profile" element={<Profile />} />
  </Routes>
      </Layout>
    </Router>
  );
};

export default App;
