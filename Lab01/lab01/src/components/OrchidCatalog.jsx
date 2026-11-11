import React from 'react';

function OrchidCatalog({ categories, search, category, onSearchChange, onCategoryChange }) {
  return (
    <div className="catalog-controls">
      <input type="search" placeholder="Search by orchid name" value={search} onChange={(event) => onSearchChange(event.target.value)} />
      <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">All categories</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
}

export default OrchidCatalog;
