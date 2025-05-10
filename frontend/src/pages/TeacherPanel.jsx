import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

export default function TeacherPanel() {
  const [studentEmail, setStudentEmail] = useState('');
  const [tokens, setTokens] = useState(10);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/rewards/award', {
        studentEmail,
        tokens,
        reason
      });
      setMessage('Tokens awarded successfully!');
    } catch (err) {
      setMessage('Failed to award tokens: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="teacher-panel">
      <h1>Teacher Reward Panel</h1>
      {message && <p className={message.includes('Failed') ? 'error' : 'success'}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Email:</label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Tokens to Award:</label>
          <input
            type="number"
            min="1"
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            required
          />
        </div>
        
        <div>
          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Award Tokens</button>
      </form>
    </div>
  );
}