import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // Mock Data
  const user = {
    name: '권찬혁',
    role: 'New Hire',
    joinedDate: '2026.01.02',
    progress: 35, // 35% complete
    currentWeek: 3
  };

  const todaysTasks = [
    { id: 1, type: 'assignment', title: 'Week 3: 기본 도면 작성 실습', status: 'In Progress', due: 'Today' },
    { id: 2, type: 'review', title: 'Week 2 과제: 평면도 수정 요청', status: 'Changes Requested', due: 'Urgent' },
    { id: 3, type: 'training', title: '사내 표준 라이브러리 교육', status: 'Not Started', due: 'Tomorrow' },
  ];

  const notifications = [
    { id: 1, date: '2026.01.06', message: '[반려] 2주차 과제 도면 레이어 오류가 발견되었습니다.' },
    { id: 2, date: '2026.01.05', message: '[공지] 이번 주 금요일 신입사원 OJT 교육 장소가 변경되었습니다.' },
  ];

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <section className="welcome-banner">
        <div>
            <h1>반갑습니다, {user.name}님</h1>
            <p className="subtitle">신입사원 온보딩 {user.currentWeek}주차 과정을 진행 중입니다.</p>
          </div>
          <div className="date-display">
            {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </div>
        </section>

        {/* Progress Section */}
        <section className="progress-section card">
          <div className="section-header">
            <h3>나의 온보딩 진행률</h3>
            <span className="percentage">{user.progress}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${user.progress}%` }}></div>
          </div>
          <p className="progress-desc">총 12주 과정 중 {user.currentWeek}주차 — 꾸준히 잘하고 계십니다.</p>
        </section>

        <div className="dashboard-grid">
          {/* Left Column: Tasks */}
          <div className="grid-column main">
            <section className="card task-card">
              <div className="card-header">
                <h3>오늘의 할 일</h3>
                <Link to="/tasks" className="more-link">전체 보기 &gt;</Link>
              </div>
              <div className="task-list">
                {todaysTasks.map(task => (
                  <div key={task.id} className={`task-item ${task.status === 'Changes Requested' ? 'alert' : ''}`}>
                    <div className="task-info">
                      <span className="task-type">{task.type.toUpperCase()}</span>
                      <h4 className="task-title">{task.title}</h4>
                    </div>
                    <div className="task-action">
                       <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                         {task.status}
                       </span>
                       <button className="btn-action">이동</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Notifications & Quick Links */}
          <div className="grid-column side">
            <section className="card notification-card">
              <div className="card-header">
                <h3>알림</h3>
              </div>
              <ul className="noti-list">
                {notifications.map(noti => (
                  <li key={noti.id} className="noti-item">
                    <span className="noti-date">{noti.date}</span>
                    <p className="noti-message">{noti.message}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card quick-links-card">
              <h3>바로가기</h3>
              <div className="quick-links-grid">
                <Link to="/manuals" className="quick-link-item">
                  <span>매뉴얼</span>
                </Link>
                <Link to="/lisp" className="quick-link-item">
                  <span>LISP 자료실</span>
                </Link>
                <Link to="/drawings" className="quick-link-item">
                  <span>표준 도면</span>
                </Link>
                <a href="#" className="quick-link-item">
                  <span>조직도</span>
                </a>
              </div>
            </section>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
