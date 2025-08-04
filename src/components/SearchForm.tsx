import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string, sort: string, order: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('stars');
  const [order, setOrder] = useState('desc');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), sort, order);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
          className="search-input"
          disabled={loading}
          required
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      <div className="search-options">
        <div className="option-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select"
            disabled={loading}
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
        </div>
        
        <div className="option-group">
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="select"
            disabled={loading}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;