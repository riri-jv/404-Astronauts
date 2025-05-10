import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TeacherPanel from './pages/TeacherPanel.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route 
            path="/teacher" 
            element={
              <PrivateRoute allowedRoles={['teacher', 'admin']}>
                <TeacherPanel />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;