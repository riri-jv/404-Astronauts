import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/rewards/dashboard');
        setAchievements(res.data.achievements);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.email}</h1>
      <h2>Your Tokens: {user?.tokens || 0}</h2>
      
      <h3>Achievements:</h3>
      <ul>
        {achievements.map((ach) => (
          <li key={ach._id}>
            <strong>{ach.title}</strong> (+{ach.tokensAwarded} tokens)
            <p>{ach.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}