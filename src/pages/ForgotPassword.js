import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { validateEmail, validatePassword } from '../utils/validation';
import './ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email harus diisi');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    setLoading(true);

    // Simulasi mengirim email
    setTimeout(() => {
      setSuccessMessage(`Email verifikasi telah dikirim ke ${email}`);
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      setError('Password baru harus diisi');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Password minimal 6 karakter dengan 1 huruf besar dan 1 angka');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    setLoading(true);

    // Simulasi reset password
    setTimeout(() => {
      const result = resetPassword(email, newPassword);
      
      if (result.success) {
        setSuccessMessage('Password berhasil direset! Silakan login dengan password baru.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="forgot-header">
          <div className="logo">⚡</div>
          <h1>Reset Password</h1>
          <p>Kami akan membantu Anda reset password</p>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="forgot-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email akun Anda"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="form-input"
                disabled={loading}
              />
            </div>

            <p className="form-description">
              Kami akan mengirimkan link verifikasi ke email Anda untuk mereset password.
            </p>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Mengirim...' : 'Kirim Email Verifikasi'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="forgot-form">
            <div className="verification-info">
              <p className="verified-email">Email: <strong>{email}</strong></p>
              <p className="verification-note">Masukkan password baru untuk akun Anda</p>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Password Baru</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Masukkan password baru"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Masukkan ulang password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className="form-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Sedang reset...' : 'Reset Password'}
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => {
                setStep(1);
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              disabled={loading}
            >
              Kembali
            </button>
          </form>
        )}

        <div className="forgot-footer">
          <p>Kembali ke <Link to="/login" className="login-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
