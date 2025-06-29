import React, { useState, useEffect, useRef } from 'react';
import searchIcon from '../assets/search.png';

const URL = import.meta.env.VITE_SERVER_URL+'/autocomplete?prefix=';
const SearchBar = ({ setCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(URL+query);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setSuggestions([]);
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit} ref={containerRef}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(city);
                setCity(city);
                setSuggestions([]);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
