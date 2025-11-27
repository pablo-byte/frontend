import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../../store/postsSlice';
import './PostFilter.css';

const PostFilter = () => {
  const dispatch = useDispatch();
  const { filterText } = useSelector((state) => state.posts);

  const handleFilterChange = (e) => {
    dispatch(setFilterText(e.target.value));
  };

  const handleClear = () => {
    dispatch(setFilterText(''));
  };

  return (
    <div className="post-filter-container">
      <div className="filter-input-wrapper">
        <label htmlFor="filter">Filtrar por nombre:</label>
        <div className="filter-input-group">
          <input
            type="text"
            id="filter"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Buscar posts por nombre..."
            className="filter-input"
          />
          {filterText && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-filter-button"
              aria-label="Limpiar filtro"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFilter;

