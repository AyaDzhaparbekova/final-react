import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddDestination from './components/AddDestination';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import RouteDetail from './pages/RouteDetail';
import SearchBar from './components/SearchBar';

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = trip => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === trip.id);
      return exists ? prev.filter(f => f.id !== trip.id) : [...prev, trip];
    });
  };

  const handleAddDestination = newTrip => {
    console.log('Added trip:', newTrip);
  };

  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route
            path='/'
            element={
              <Home favorites={favorites} toggleFavorite={toggleFavorite} />
            }
          />
          <Route path='/route/:id' element={<RouteDetail />} />
          <Route
            path='/favorites'
            element={
              <ProtectedRoute>
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          {}
          <Route
            path='/add'
            element={<AddDestination onAdd={handleAddDestination} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
