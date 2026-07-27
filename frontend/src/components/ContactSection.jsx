import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
    }
  };

  return (
    <section style={{ padding: '60px 20px', background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', color: '#0B3D91', marginBottom: '10px' }}>Hubungi Kami</h2>
          <p style={{ color: '#475569' }}>Punya pertanyaan atau butuh penawaran? Kirimkan pesan kepada kami dan tim admin akan segera merespons Anda.</p>
        </div>

        {status === 'success' && (
          <div style={{ padding: '16px', background: '#dcfce7', color: '#16a34a', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            ✓ Pesan Anda berhasil dikirim! Tim admin kami akan segera merespons.
          </div>
        )}

        {status === 'error' && (
          <div style={{ padding: '16px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            ✗ Gagal mengirim pesan. Silakan coba lagi nanti.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Nama Lengkap *</label>
              <input 
                type="text" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Email *</label>
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
                placeholder="email@anda.com"
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Nomor WhatsApp / Telepon</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} 
              placeholder="081234567890"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Pesan *</label>
            <textarea 
              name="message"
              required 
              rows="5"
              value={formData.message}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }} 
              placeholder="Tuliskan pertanyaan atau kebutuhan Anda di sini..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ 
              background: '#0B3D91', 
              color: '#fff', 
              padding: '14px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'background 0.3s'
            }}
          >
            {status === 'loading' ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}
          </button>
        </form>
      </div>
    </section>
  );
}
