import React from 'react';

const Footer = ({ maxAge, setMaxAge, timeFilters }) => {
  return (
    <footer className="footer">
      <div className="filter-container">
        {timeFilters.map((filter) => (
          <button
            key={filter.days}
            onClick={() => setMaxAge(filter.days)}
            className={maxAge === filter.days ? 'active' : ''}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;