import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Library.css';

type Category = 'drawings' | 'lisp' | 'manuals';

interface LibraryItem {
  id: number;
  category: Category;
  title: string;
  description: string;
  version: string;
  updatedDate: string;
  serverPath: string; // UNC or HTTP path
  tags: string[];
}

const Library: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Category>('drawings');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine active tab based on URL path
  useEffect(() => {
    if (location.pathname.includes('lisp')) setActiveTab('lisp');
    else if (location.pathname.includes('manuals')) setActiveTab('manuals');
    else setActiveTab('drawings');
  }, [location]);

  // Mock Data
  const items: LibraryItem[] = [
    // Drawings
    { id: 1, category: 'drawings', title: '00_Standard_Detail_Arch_v2025.dwg', description: '2025년 건축 표준 상세도 (공통)', version: 'v2025.1', updatedDate: '2025.12.20', serverPath: '\\\\SIAPLAN-NAS\\Standard\\Drawings\\Arch\\v2025.dwg', tags: ['Arch', 'Standard', 'Detail'] },
    { id: 2, category: 'drawings', title: 'A3_TitleBlock_Horizontal.dwg', description: 'A3 가로형 도곽 (기본)', version: 'v1.0', updatedDate: '2024.01.10', serverPath: '\\\\SIAPLAN-NAS\\Standard\\TitleBlocks\\A3_Hor.dwg', tags: ['TitleBlock', 'A3'] },
    
    // LISP
    { id: 3, category: 'lisp', title: 'AreaCalc_v3.lsp', description: '폴리라인 면적 산출 및 표 작성 (명령어: AR)', version: 'v3.2', updatedDate: '2025.06.15', serverPath: '\\\\SIAPLAN-NAS\\LISP\\AreaCalc.lsp', tags: ['Area', 'Table'] },
    { id: 4, category: 'lisp', title: 'LayerManager_Pro.vlx', description: '사내 표준 레이어 자동 변환 툴 (명령어: LM)', version: 'v1.5', updatedDate: '2025.03.10', serverPath: '\\\\SIAPLAN-NAS\\LISP\\LayerManager.vlx', tags: ['Layer', 'Standard'] },
    
    // Manuals
    { id: 5, category: 'manuals', title: 'SIAPLAN_PMS_Guide.pdf', description: 'PMS 프로젝트 등록 및 일정 관리 가이드', version: 'v2.0', updatedDate: '2026.01.02', serverPath: '\\\\SIAPLAN-NAS\\Manuals\\PMS\\Guide_v2.pdf', tags: ['PMS', 'Workflow'] },
    { id: 6, category: 'manuals', title: 'AutoCAD_2026_Setup_Checklist.pdf', description: '오토캐드 초기 세팅 체크리스트 (플롯 스타일, 폰트)', version: 'v1.0', updatedDate: '2026.01.05', serverPath: '\\\\SIAPLAN-NAS\\Manuals\\Setup\\AutoCAD.pdf', tags: ['Setup', 'AutoCAD'] },
  ];

  const filteredItems = items.filter(
    item => 
      item.category === activeTab && 
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`서버 경로가 복사되었습니다.\n${text}`);
    });
  };

  return (
    <div className="library-page fade-in">
      <div className="page-header">
        <h1>자료실 (Library)</h1>
        <p className="subtitle">사내 표준 도면, LISP, 매뉴얼을 검색하고 다운로드할 수 있습니다.</p>
      </div>

      <div className="library-controls">
        <div className="tabs">
           <button className={`tab-btn ${activeTab === 'drawings' ? 'active' : ''}`} onClick={() => setActiveTab('drawings')}>표준 도면</button>
           <button className={`tab-btn ${activeTab === 'lisp' ? 'active' : ''}`} onClick={() => setActiveTab('lisp')}>LISP 라이브러리</button>
           <button className={`tab-btn ${activeTab === 'manuals' ? 'active' : ''}`} onClick={() => setActiveTab('manuals')}>매뉴얼 & 가이드</button>
        </div>
        <div className="search-bar-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색어 입력 (제목, 태그, 설명)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="library-list-container">
        <div className="library-list-header">
          <div className="col-info">파일 정보 (File Info)</div>
          <div className="col-meta">업데이트 (Updated)</div>
          <div className="col-actions"></div>
        </div>

        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="library-list-item">
              <div className="col-info">
                <div className="item-head">
                  <span className="item-title">{item.title}</span>
                  <span className="item-version">{item.version}</span>
                  <div className="item-tags">
                    {item.tags.map(tag => <span key={tag} className="item-tag">#{tag}</span>)}
                  </div>
                </div>
                <p className="item-desc">{item.description}</p>
              </div>
              <div className="col-meta">
                <span className="item-date">{item.updatedDate}</span>
              </div>
              <div className="col-actions">
                <button className="btn-action" onClick={() => copyToClipboard(item.serverPath)}>
                  경로 복사
                </button>
                <a href="#" className="btn-action primary" onClick={(e) => { e.preventDefault(); alert("인트라넷/파일서버 직접 접근이 구성되면 다운로드가 시작됩니다."); }}>
                  다운로드
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      <div className="server-notice">
        <p>💡 <b>Tip:</b> [경로 복사] 후 파일 탐색기 주소창에 붙여넣으시면 바로 접근 가능합니다.</p>
      </div>
    </div>
  );
};

export default Library;
