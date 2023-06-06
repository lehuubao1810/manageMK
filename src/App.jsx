import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem dữ liệu currentUser đã được tải hay chưa
    if (currentUser !== null) {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>; // Hoặc bạn có thể hiển thị một spinner/loading component ở đây
  }

  return (
    <Router>
      <Routes>
        <Route index  element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  );
}
export default App;