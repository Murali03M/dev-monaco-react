import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ChallengeList from './components/Challenges/ChallengeList';
import ChallengeDetail from './components/Challenges/ChallengeDetail';
import CreateChallenge from './components/Challenges/CreateChallenge';
import Profile from './components/User/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/Protect/ProtectedRoute';
import Settings from './components/User/Settings';
import ResetPassword from './components/Auth/ResetPassword';

const App = () => {
  return (
    <Router>
      <Layout>
     
        <Routes>
           <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPasssword" element={<ResetPassword />} />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <ChallengeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/:id"
            element={
              <ProtectedRoute>
                <ChallengeDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-challenge"
            element={
              <ProtectedRoute>
                <CreateChallenge />
              </ProtectedRoute>
            }
          />
           <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
