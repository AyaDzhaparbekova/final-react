import React from 'react';
import RouteCard from './RouteCard';

function RouteList({ routes, toggleFavorite, favorites }) {
  return (
    <div>
      {routes.map(route => (
        <RouteCard
          key={route.id}
          route={route}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      ))}
    </div>
  );
}

export default RouteList;
