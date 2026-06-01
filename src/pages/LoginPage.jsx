import React from 'react';
import { Link } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import useInput from '../hooks/useInput';
import { useLocale } from '../contexts/LocaleContext';

function LoginPage({ onLoginSuccess }) {
  const { t } = useLocale();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (!result.error) {
      putAccessToken(result.data.accessToken);
      onLoginSuccess();
    }
  };

  return (
    <div className="auth-page">
      <h2>{t.loginSubtitle2}</h2>
      <form className="input-login" onSubmit={handleSubmit}>
        <label htmlFor="email">{t.email}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <label htmlFor="password">{t.password}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button type="submit">{t.login}</button>
      </form>
      <p className="auth-link-text">
        {t.loginSubtitle} <Link to="/register">{t.registerHere}</Link>
      </p>
    </div>
  );
}

export default LoginPage;
