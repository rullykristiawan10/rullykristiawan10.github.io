import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login gagal.');
      }
    } catch (err) {
      setError('Kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box shadow-premium animate-pop-in">
        <div className="admin-login-header">
          <div className="admin-login-logo-container">
            <img 
              src="/images/Gemini_Generated_Image_l8zeeml8zeeml8ze-removebg-preview.png" 
              alt="Logo Mitra Clima Pro" 
              className="admin-login-logo-img"
            />
          </div>
          <h2>Admin Login</h2>
          <p>Masuk untuk mengelola katalog produk</p>
        </div>
        
        {error && <div className="admin-error-alert">{error}</div>}
        
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              placeholder="Masukkan username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Masukkan password"
            />
          </div>
          <button type="submit" className="btn-admin-primary" disabled={loading}>
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <div className="admin-login-footer">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>&larr; Kembali ke Beranda</a>
        </div>
      </div>
    </div>
  );
}
