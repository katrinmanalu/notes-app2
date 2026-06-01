import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2 style={{ fontSize: '64px' }}>404</h2>
      <p style={{ fontSize: '20px', marginTop: '16px' }}>Halaman tidak ditemukan.</p>
      <Link to="/" style={{ marginTop: '24px', display: 'inline-block', fontSize: '18px' }}>
        ← Kembali ke beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
