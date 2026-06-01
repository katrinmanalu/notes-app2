import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import useInput from '../hooks/useInput';
import { useLocale } from '../contexts/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t.passwordMismatch);
      return;
    }
    const result = await register({ name, email, password });
    if (!result.error) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <h2>{t.registerSubtitle2}</h2>
      <form className="input-register" onSubmit={handleSubmit}>
        <label htmlFor="name">{t.name}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          required
        />
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
        <label htmlFor="confirmPassword">{t.confirmPassword}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
        <button type="submit">{t.register}</button>
      </form>
      <p className="auth-link-text">
        {t.registerSubtitle} <Link to="/login">{t.loginHere}</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
