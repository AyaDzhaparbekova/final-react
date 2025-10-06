import React from 'react';
import routesData from '../data/routes.json';
import RouteList from '../components/RouteList';

function Favorites({ favorites, toggleFavorite }) {
  const favoriteRoutes = routesData.filter(route =>
    favorites.includes(route.id)
  );
  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRoutes.length === 0 ? (
        <p>No favorite routes yet.</p>
      ) : (
        <RouteList
          routes={favoriteRoutes}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
}

export default Favorites;
