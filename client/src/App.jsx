import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  // Clear corrupted user data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Check if user object is valid
        if (!parsed || !parsed._id || !parsed.email || !parsed.token || !parsed.role) {
          console.log('Clearing corrupted user data');
          localStorage.removeItem('user');
          window.location.reload();
        }
      } catch (e) {
        console.log('Clearing invalid user data');
        localStorage.removeItem('user');
        window.location.reload();
      }
    }
  }, []);

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
