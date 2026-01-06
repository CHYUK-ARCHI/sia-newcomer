import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear mock auth data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    // Redirect to login
    navigate("/");
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <h2>SIAPLAN</h2>
          <span className="subtitle">New Comer On-Boarding System</span>
        </div>
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            Dashboard
          </Link>
          <div className="nav-header">LEARNING</div>
          <Link to="/curriculum" className="nav-item">
            Curriculum
          </Link>
          <div className="nav-header">RESOURCES</div>
          <Link to="/drawings" className="nav-item">
            Standard Drawings
          </Link>
          <Link to="/lisp" className="nav-item">
            LISP Library
          </Link>
          <Link to="/manuals" className="nav-item">
            Manuals & Setup
          </Link>

          {localStorage.getItem("user_role") === "ADMIN" && (
            <>
              <div className="nav-header">ADMIN</div>
              <Link to="/admin" className="nav-item">
                Admin Console
              </Link>
            </>
          )}
        </nav>
        <div className="user-profile">
          <div className="info">
            <span className="name">권찬혁</span>
            {/* Display Role for Debugging */}
            <span className="role">
               {localStorage.getItem('user_role') === 'ADMIN' ? 'Administrator' : 'New Hire'}
            </span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="breadcrumbs">Home / Dashboard</div>
          <div className="actions">
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="content-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
