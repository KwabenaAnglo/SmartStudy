import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Brain, BookOpen, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">
          <img 
            src="/logo.jpg" 
            alt="SmartStudy Logo" 
            style={{
              height: '40px',
              width: 'auto',
              borderRadius: '8px',
              marginRight: '12px'
            }}
          />
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            SmartStudy
          </span>
        </div>
        
        {isAuthenticated ? (
          <>
            <div className="nav-links">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <Home size={20} />
                Dashboard
              </Link>
              <Link to="/notes" className={`nav-link ${isActive('/notes') ? 'active' : ''}`}>
                <FileText size={20} />
                My Notes
              </Link>
              <Link to="/quizzes" className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`}>
                <Brain size={20} />
                Quizzes
              </Link>
              <Link to="/create-note" className={`nav-link ${isActive('/create-note') ? 'active' : ''}`}>
                <BookOpen size={20} />
                Create Note
              </Link>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#6c757d',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span style={{ fontWeight: '500' }}>{user?.username}</span>
                <ChevronDown size={16} />
              </button>

              {showUserMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    padding: '8px 0',
                    minWidth: '200px',
                    zIndex: 1000,
                    marginTop: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div style={{ 
                    padding: '12px 16px', 
                    borderBottom: '1px solid #e9ecef',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      {user?.username}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                      {user?.email}
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#6c757d',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Settings size={16} />
                    Profile Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#dc3545',
                      background: 'none',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="nav-links">
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
              <Link to="/signup" className="btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  };

  export default Navigation;
