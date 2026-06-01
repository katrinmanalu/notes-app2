import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';

// Import kumpulan icon modern dari Material Design (MDI)
import { MdGTranslate, MdOutlineWbSunny, MdOutlineDarkMode, MdLogout } from 'react-icons/md';

function Header({ userLogged, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const location = useLocation();

  const isArchivedPage = location.pathname === '/archived';

  // Label for the archive nav link
  const archiveLinkLabel = locale === 'id'
    ? (isArchivedPage ? 'Catatan Aktif' : 'Terarsip')
    : (isArchivedPage ? 'Active Note' : 'Archived');
  const archiveLinkTo = isArchivedPage ? '/' : '/archived';

  // App title
  const appTitle = locale === 'id' ? 'Aplikasi Catatan' : 'Notes App';

  return (
    <header>
      <h1>
        <Link to="/">{appTitle}</Link>
      </h1>
      <nav className="navigation">
        <ul>
          {userLogged && (
            <li>
              <Link to={archiveLinkTo} className="nav-archive-link">
                {archiveLinkLabel}
              </Link>
            </li>
          )}
          <li>
            <button className="toggle-locale" onClick={toggleLocale} title="Toggle Language">
              {/* Logo Translate Baru */}
              <MdGTranslate size={24} />
            </button>
          </li>
          <li>
            <button className="toggle-theme" onClick={toggleTheme} title="Toggle Theme">
              {/* Logo Dark/Light Mode Baru */}
              {theme === 'dark' ? <MdOutlineWbSunny size={24} /> : <MdOutlineDarkMode size={24} />}
            </button>
          </li>
          {userLogged && (
            <li>
              <button className="button-logout" onClick={onLogout}>
                {/* Logo Logout Baru */}
                <MdLogout size={24} /> {userLogged.name}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;