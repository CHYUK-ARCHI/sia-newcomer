import React, { useState } from 'react';
import './Curriculum.css';

interface Session {
  id: number;
  category: 'Basic' | 'Practical';
  round: number;
  date: string;
  topic: string;
  content: string; // Remarks/Details
  isAttended: boolean;
}

const Curriculum: React.FC = () => {
  // Initial Mock Data based on User's Image
  const [basicSessions, setBasicSessions] = useState<Session[]>([
    { id: 1, category: 'Basic', round: 1, date: '1.16', topic: '도면작성매뉴얼', content: '사내 매뉴얼 설명 (건축,구조)', isAttended: true },
    { id: 2, category: 'Basic', round: 2, date: '1.23', topic: '면적산정', content: '면적구성, 면적산출기준', isAttended: true },
    { id: 3, category: 'Basic', round: 3, date: '1.30', topic: '계단, 승강기', content: '계단, 승강기 계획', isAttended: false },
    { id: 4, category: 'Basic', round: 4, date: '2.20', topic: '피난 및 방화', content: '보행/차량/수직동선 설명', isAttended: false },
    { id: 5, category: 'Basic', round: 5, date: '2.27', topic: '장애인, BF', content: '관계법령, 적용사례', isAttended: false },
    { id: 6, category: 'Basic', round: 6, date: '3.06', topic: '단열, 방수', content: '단열, 방수 계획', isAttended: false },
    { id: 7, category: 'Basic', round: 7, date: '3.20', topic: '구조계획', content: '구조공법, 계산서, 도면 작성', isAttended: false },
    { id: 8, category: 'Basic', round: 8, date: '3.27', topic: '설계체크리스트', content: '설계체크리스트 활용법', isAttended: false },
  ]);

  const toggleAttendance = (id: number) => {
    setBasicSessions(prev => prev.map(session => 
      session.id === id ? { ...session, isAttended: !session.isAttended } : session
    ));
  };

  return (
    <div className="curriculum-page fade-in">
      <div className="page-header">
        <h1>2026년 신입사원 교육계획</h1>
        <p className="subtitle">기초교육(8회) 및 실무교육 이수 현황을 관리합니다.</p>
      </div>

      <section className="curriculum-section card">
        <div className="section-title">
          <h2>📘 기초교육 (신입사원)</h2>
          <span className="info-badge">매주 금요일 16:00 ~ 18:00 (2시간)</span>
        </div>
        
        <div className="table-responsive">
          <table className="curriculum-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>회차</th>
                <th style={{ width: '80px' }}>날짜</th>
                <th style={{ width: '200px' }}>교육내용</th>
                <th>비고 (상세내용)</th>
                <th style={{ width: '100px', textAlign: 'center' }}>참석여부</th>
              </tr>
            </thead>
            <tbody>
              {basicSessions.map((session) => (
                <tr key={session.id} className={session.isAttended ? 'attended' : ''}>
                  <td className="text-center">{session.round}회</td>
                  <td className="text-center">{session.date}</td>
                  <td className="fw-bold">{session.topic}</td>
                  <td className="text-muted">{session.content}</td>
                  <td className="text-center">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={session.isAttended} 
                        onChange={() => toggleAttendance(session.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="curriculum-section card">
        <div className="section-title">
          <h2>📕 실무교육 (신입 + 저연차)</h2>
          <span className="info-badge">4~11월 매월 1회 (금요일 17:00 ~ 18:00)</span>
        </div>
        <div className="placeholder-box">
          <p>📅 4월부터 시작되는 교육 일정입니다.</p>
          <ul className="simple-list">
             <li>4/24 - 설계도서 작성시 주요 오류 사례</li>
             <li>5/29 - 시공 중 발견하는 설계오류, VE 사례</li>
             <li>... (추후 업데이트)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
