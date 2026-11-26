import { useState } from 'react';
import {
  FiSearch,
  FiUser,
  FiChevronDown
} from 'react-icons/fi';

export default function Navbar({ onLoginClick }) {
  const [language, setLanguage] = useState('En');
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      alert(`Search: ${search}`);
    }
  };

  return (
    <header className="navbar">
      <a href="#home" className="logo">
        <div className="logo-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <span>Site<strong>Logo</strong></span>
      </a>

      <nav className="navigation">
        <a href="#about">About</a>

        <div className="dropdown">
          <button type="button" className="nav-button">
            Features
          </button>

          <div className="dropdown-menu">
            <a href="#automation">Automation</a>
            <a href="#infrastructure">IT infrastructure</a>
            <a href="#security">Information security</a>
          </div>
        </div>

        <a href="#pricing">Pricing</a>
        <a href="#gallery">Gallery</a>
        <a href="#team">Team</a>
      </nav>

      <div className="nav-actions">
        <div className="language">
          <select
            aria-label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="En">En</option>
            <option value="Ua">Ua</option>
            <option value="De">De</option>
          </select>

          <FiChevronDown />
        </div>

        <div className="separator"></div>

        <button
          type="button"
          className="icon-button"
          aria-label="Search"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <FiSearch />
        </button>

        <button
          type="button"
          className="icon-button"
          aria-label="Login"
          onClick={onLoginClick}
        >
          <FiUser />
        </button>
      </div>

      {searchOpen && (
        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <button type="submit">
            <FiSearch />
          </button>
        </form>
      )}
    </header>
  );
}