import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArchivedPage from './pages/ArchivedPage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingIndicator from './components/LoadingIndicator';
import { getUserLogged, putAccessToken, getAccessToken } from './utils/network-data';

function App() {
  const [userLogged, setUserLogged] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (token) {
        const result = await getUserLogged();
        if (!result.error) {
          setUserLogged(result.data);
        } else {
          localStorage.removeItem('accessToken');
        }
      }
      setInitializing(false);
    };

    initializeAuth();
  }, []);

  const onLoginSuccess = async () => {
    const result = await getUserLogged();
    if (!result.error) {
      setUserLogged(result.data);
    }
  };

  const onLogout = () => {
    putAccessToken('');
    localStorage.removeItem('accessToken');
    setUserLogged(null);
  };

  if (initializing) {
    return (
      <div className="app-container">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header userLogged={userLogged} onLogout={onLogout} />

      <Routes>
        {userLogged ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
