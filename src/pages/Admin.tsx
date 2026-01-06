import React, { useState } from 'react';
import './Admin.css';

interface User {
  id: string;
  password?: string; // Optional for existing types, but needed for login
  name: string;
  role: string; // 'Admin' | 'Leader' | 'PL' | 'Architect' | 'New Comer'
  team: string;
  joinDate: string;
}

const STORAGE_KEY = 'siaplan_users';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'content'>('users');
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<User>({
    id: '',
    password: 'password123', // Default
    name: '',
    role: 'New Comer',
    team: '설계1본부',
    joinDate: new Date().toISOString().split('T')[0].replace(/-/g, '.')
  });

  // Load Users from LocalStorage
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    // Seed Default Users if empty
    const defaults: User[] = [
      { id: 'admin', password: 'admin', name: 'Master', role: 'Admin', team: '경영지원', joinDate: '2010.03.02' },
      { id: '2024001', password: 'test', name: '권찬혁', role: 'New Comer', team: '설계1본부', joinDate: '2024.01.02' },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.some(u => u.id === formData.id)) {
      alert('이미 존재하는 사번입니다.');
      return;
    }
    const newUsers = [...users, formData];
    setUsers(newUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers));
    setShowModal(false);
    alert(`${formData.name}님이 등록되었습니다.`);
    // Reset form
    setFormData({
       id: '', password: 'password123', name: '', role: 'New Comer', team: '설계1본부', joinDate: new Date().toISOString().split('T')[0].replace(/-/g, '.')
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-page fade-in">
      <div className="page-header">
        <h1>관리자 콘솔 (Admin Console)</h1>
        <p className="subtitle">사용자 권한 관리 및 콘텐츠 업데이트를 수행합니다.</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          사용자 관리
        </button>
        <button 
          className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          콘텐츠 관리
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' ? (
          <div className="card">
            <div className="panel-header">
              <h3>등록된 사용자 목록 ({users.length})</h3>
              <button className="btn-primary-sm" onClick={() => setShowModal(true)}>신규 사용자 등록</button>
            </div>

            {/* Registration Modal */}
            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>신규 사용자 등록</h3>
                  <form onSubmit={handleRegister}>
                    <div className="form-group">
                      <label>사번 (ID)</label>
                      <input name="id" value={formData.id} onChange={handleChange} required placeholder="예: 2024101" />
                    </div>
                    <div className="form-group">
                      <label>비밀번호</label>
                      <input name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>이름</label>
                      <input name="name" value={formData.name} onChange={handleChange} required placeholder="예: 홍길동" />
                    </div>
                    <div className="form-group">
                      <label>팀/소속</label>
                      <select name="team" value={formData.team} onChange={handleChange}>
                        <option value="경영지원">경영지원</option>
                        <option value="설계1본부">설계1본부</option>
                        <option value="설계2본부">설계2본부</option>
                        <option value="SID">SID</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>역할</label>
                      <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="New Comer">New Comer</option>
                        <option value="Leader">Leader</option>
                        <option value="PL">PL</option>
                        <option value="Architect">Architect</option>
                        {/* Admin option can be hidden or kept if user wants to create more admins */}
                      </select>
                    </div>
                    <div className="modal-actions">
                      <button type="button" onClick={() => setShowModal(false)}>취소</button>
                      <button type="submit" className="btn-primary-sm">등록</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>사번</th>
                  <th>이름</th>
                  <th>직급/역할</th>
                  <th>소속</th>
                  <th>입사일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="fw-bold">{user.name}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase().replace(' ', '-')}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.team}</td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button className="btn-text">수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card">
            <div className="panel-header">
              <h3>라이브러리 자산 관리</h3>
              <button className="btn-primary-sm">자료 업로드</button>
            </div>
            <div className="placeholder-content">
              <p>서버 파일 시스템과 연동하여 표준 도면 및 매뉴얼을 관리하는 기능입니다.</p>
              <div className="upload-area">
                <span>파일을 이곳에 드래그하여 업로드하세요 (준비중)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
