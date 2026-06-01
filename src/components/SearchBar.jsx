import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

function SearchBar({ keyword, onKeywordChange }) {
  const { locale } = useLocale();
  const placeholder = locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...';

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
