import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function AdminWhatsApp() {
  const [waStatus, setWaStatus] = useState('memuat');
  const [qrCode, setQrCode] = useState(null);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/whatsapp/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setWaStatus(data.status);
        setQrCode(data.qr);
      }
    } catch (error) {
      console.error('Error fetching WA status:', error);
      setWaStatus('error');
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch('/api/whatsapp/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchStatus();
    } catch (error) {
      console.error('Error logging out WA:', error);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', margin: 0 }}>Pengaturan WhatsApp Bot</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Status:</span>
          {waStatus === 'terkoneksi' && <span style={{ background: '#dcfce7', color: '#16a34a', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>🟢 Terkoneksi</span>}
          {waStatus === 'menunggu' && <span style={{ background: '#fef9c3', color: '#ca8a04', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>🟡 Menunggu Scan</span>}
          {waStatus === 'terputus' && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>🔴 Terputus</span>}
          {waStatus === 'memuat' && <span style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>⏳ Memuat...</span>}
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {waStatus === 'terkoneksi' ? (
          <div>
            <svg viewBox="0 0 24 24" width="64" height="64" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Bot Siap Digunakan!</h4>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto 20px' }}>Nomor WhatsApp Anda telah terhubung. Bot akan mengirimkan notifikasi saat ada pengunjung yang mengisi form Hubungi Kami.</p>
            <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Putuskan Koneksi (Logout)
            </button>
          </div>
        ) : waStatus === 'menunggu' && qrCode ? (
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Scan QR Code Berikut</h4>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', display: 'inline-block', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <QRCodeSVG value={qrCode} size={256} />
            </div>
            <p style={{ color: 'var(--muted)', marginTop: '16px', maxWidth: '400px' }}>
              Buka aplikasi WhatsApp di HP Anda &gt; Tautkan Perangkat (Linked Devices) &gt; Tautkan Perangkat &gt; Scan QR Code di atas.
            </p>
          </div>
        ) : waStatus === 'terputus' ? (
          <div>
            <svg viewBox="0 0 24 24" width="64" height="64" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Bot Terputus</h4>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto' }}>Koneksi terputus dari server WhatsApp. Sedang mere-generate QR Code...</p>
          </div>
        ) : (
          <div>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
            <p style={{ color: 'var(--muted)' }}>Menghubungkan ke server WhatsApp...</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px' }}>
        <h5 style={{ color: '#92400e', margin: '0 0 8px 0', fontSize: '15px' }}>📌 Catatan Penting:</h5>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#b45309', fontSize: '14px', lineHeight: '1.6' }}>
          <li>Pastikan HP yang digunakan untuk WhatsApp Bot selalu terkoneksi dengan internet sesekali agar sesi tidak kedaluwarsa.</li>
          <li>Sangat disarankan menggunakan nomor WhatsApp sekunder (bukan nomor pribadi utama) untuk menghindari risiko pemblokiran dari pihak WhatsApp.</li>
          <li>QR Code akan berubah otomatis. Jika gagal scan, tunggu sejenak hingga QR Code baru muncul.</li>
        </ul>
      </div>
    </div>
  );
}
