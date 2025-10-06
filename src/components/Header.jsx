import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Travel Planner</h1>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/favorites'>Favorites</Link>
      </nav>
      <hr />
    </header>
  );
}

export default Header;
