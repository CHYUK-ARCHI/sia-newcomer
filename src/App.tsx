import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Curriculum from './pages/Curriculum';
import Library from './pages/Library';
import Admin from './pages/Admin';
import './App.css';

// Mock Protected Route
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('auth_token');
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<div>My Tasks (Coming Soon)</div>} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="drawings" element={<Library />} />
            <Route path="lisp" element={<Library />} />
            <Route path="manuals" element={<Library />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
