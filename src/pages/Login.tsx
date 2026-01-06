import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  // ... (state lines kept same)
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  interface User {
    id: string;
    password?: string;
    role: string;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // 1. Get users from LocalStorage
      const savedUsers = localStorage.getItem('siaplan_users');
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      // 2. Find matching user
      // Note: 'admin'/'admin' fallback is preserved if not in storage, 
      // but ideally we check storage first.
      const foundUser = users.find(u => u.id === employeeId && u.password === password);

      if (foundUser) {
        localStorage.setItem('auth_token', 'token_' + foundUser.id);
        localStorage.setItem('user_role', foundUser.role.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'NEW_HIRE');
        navigate('/');
      } else if (employeeId === 'admin' && password === 'admin') {
        // Fallback for initial admin access if storage is wiped/empty
        localStorage.setItem('auth_token', 'mock_token_admin');
        localStorage.setItem('user_role', 'ADMIN');
        navigate('/');
      } else {
        setError('등록되지 않은 사번이거나 비밀번호가 틀렸습니다.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="SIAPLAN Logo" className="login-logo" style={{ maxWidth: '180px', marginBottom: '1rem' }} />
          <p className="subtitle">New Comer On-Boarding System</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="employeeId">사번</label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="7자리 사번을 입력하세요"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-footer">
          <p>Authorized Personnel Only</p>
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
