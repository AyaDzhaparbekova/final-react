import React from 'react';
import { useParams } from 'react-router-dom';
import routesData from '../data/routes.json';

function RouteDetail() {
  const { id } = useParams();
  const route = routesData.find(r => r.id === parseInt(id));

  if (!route) return <p>Route not found</p>;

  return (
    <div className='route-detail'>
      <h1>{route.name}</h1>
      <p>{route.description}</p>
      <p>Country: {route.country}</p>
      <p>Duration: {route.duration} days</p>
      <p>Budget: ${route.budget}</p>
      <p>Weather: {route.weather}</p>
      <div>
        {route.photos.map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt={route.name}
          />
        ))}
      </div>
    </div>
  );
}

export default RouteDetail;
