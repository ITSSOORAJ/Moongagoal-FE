import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="nav"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
        boxShadow: '0 4px 10px rgba(255, 182, 193, 0.4)',
        fontFamily: "'Poppins', sans-serif",
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* ✅ Brand / Logo */}
      <div
        className="brand"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          fontSize: '22px',
          color: '#d63384',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            gap: '10px',
          }}
        >
          <img
            src="https://media1.tenor.com/m/cgDBNpvu18UAAAAC/owl.gif"
            alt="MoongaGoal Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          MoongaGoal
        </Link>
      </div>

      {/* ✅ Mobile Menu Button */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'none',
          cursor: 'pointer',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#d63384"
          style={{ width: 28, height: 28 }}
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* ✅ Nav Links */}
      <nav
        className={`nav-links ${menuOpen ? 'open' : ''}`}
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        {user ? (
          <>
            <div className="small" style={{ color: '#6b7280' }}>
              Hello, <b>{user.name}</b>
            </div>
            <button
              className="btn"
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              style={{
                background: 'linear-gradient(135deg, #f78fb3, #fbc2eb)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="small"
              style={{
                color: '#555',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #f78fb3, #fbc2eb)',
                padding: '8px 16px',
                borderRadius: '25px',
                color: 'white',
                fontWeight: 600,
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>

      <style jsx>{`
        /* Hide menu button on large screens */
        @media (max-width: 768px) {
          .menu-btn {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 65px;
            left: 0;
            width: 100%;
            background: linear-gradient(135deg, #fce4ec, #f8bbd0);
            flex-direction: column;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            box-shadow: 0 4px 10px rgba(255, 182, 193, 0.4);
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
          }
          .nav-links.open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          header {
            padding: 10px 16px;
          }
          .brand {
            font-size: 18px;
          }
          .btn {
            font-size: 0.9rem;
            padding: 6px 12px;
          }
        }
      `}</style>
    </header>
  );
}
