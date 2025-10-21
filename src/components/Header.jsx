import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header>
      <h1>Travel Planner</h1>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/favorites'>Favorites</Link> |{' '}
        {isLoggedIn && currentUser ? (
          <>
            <span>Welcome, {currentUser.email}</span>{' '}
            <button
              onClick={handleLogout}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
