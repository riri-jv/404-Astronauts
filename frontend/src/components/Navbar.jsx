import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
        {user?.role === 'teacher' || user?.role === 'admin' ? (
          <Link to="/teacher">Teacher Panel</Link>
        ) : null}
      </div>
      
      <div className="nav-right">
        {user ? (
          <>
            <span>Logged in as: {user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}