import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { validateEmail } from '../utils/validation';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validasi
    if (!formData.email.trim()) {
      setError('Email harus diisi');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Format email tidak valid');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password harus diisi');
      setLoading(false);
      return;
    }

    // Simulasi delay network
    setTimeout(() => {
      const result = login(formData.email, formData.password);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('pln_remember_email', formData.email);
        }
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo">⚡</div>
          <h1>PLN Login</h1>
          <p>Masuk ke akun Anda</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="contoh@pln.co.id"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Ingat saya</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">Lupa password?</Link>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Sedang masuk...' : 'Masuk'}
          </button>
        </form>

        <div className="login-divider">atau</div>

        <div className="login-footer">
          <p>Belum punya akun? <Link to="/signup" className="signup-link">Daftar di sini</Link></p>
        </div>

        <div className="demo-info">
          <h4>🔍 Demo Credentials:</h4>
          <p><strong>User Email:</strong> demo@pln.co.id</p>
          <p><strong>Password:</strong> Demo@123</p>
          <p><strong>Admin Email:</strong> admin@pln.co.id</p>
          <p><strong>Password:</strong> Admin@123</p>
          <p style={{ fontSize: '12px', marginTop: '8px' }}>Atau buat akun baru untuk testing sebagai user.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
