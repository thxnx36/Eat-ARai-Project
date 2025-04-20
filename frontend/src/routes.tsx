import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RandomRecipe from './pages/RandomRecipe';
import SearchRecipe from './pages/SearchRecipe';
import PopularRecipes from './pages/PopularRecipes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random" element={<RandomRecipe />} />
      <Route path="/search" element={<SearchRecipe />} />
      <Route path="/popular" element={<PopularRecipes />} />
    </Routes>
  );
};

export default AppRoutes; 