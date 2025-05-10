import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}