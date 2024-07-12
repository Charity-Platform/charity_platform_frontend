// src/components/FilterBooks.js
import React from 'react';

const FilterBooks = ({ categories, onSelectCategory }) => {
  return (
    <div className="mb-4">
      <label htmlFor="categorySelect" className="form-label">: إختار الفئة التى تريدها </label>
      <select id="categorySelect" className="form-select" onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">كل الكتب </option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBooks;
