import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RouteDetail from './pages/RouteDetail';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <Router>
      <Header />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/route/:id" element={<RouteDetail/>} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;