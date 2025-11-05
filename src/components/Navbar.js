import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

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
      }}
    >
      {/* Logo + Brand Name */}
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
            src="https://media1.tenor.com/m/cgDBNpvu18UAAAAC/owl.gif" // ✅ You can replace with any URL or local image path
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

      {/* Navigation / Auth Buttons */}
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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
    </header>
  );
}
