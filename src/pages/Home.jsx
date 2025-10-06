import React, { useState } from 'react';
import routesData from '../data/routes.json';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RouteList from '../components/RouteList';

function Home({ favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: '', budget: null });

  const filteredRoutes = routesData.filter(route => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type ? route.type === filters.type : true;
    const matchesBudget = filters.budget
      ? route.budget <= filters.budget
      : true;
    return matchesSearch && matchesType && matchesBudget;
  });

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters filters={filters} setFilters={setFilters} />
      <RouteList
        routes={filteredRoutes}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
}

export default Home;
