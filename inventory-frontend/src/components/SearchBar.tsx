import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search inventory..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;


