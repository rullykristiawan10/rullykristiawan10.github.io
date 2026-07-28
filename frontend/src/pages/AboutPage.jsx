import ContactSection from '../components/ContactSection';

export default function AboutPage() {
  return (
    <>
      <div className="page-header" style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%)', color: 'white' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '15px' }}>Tentang Kami</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
          Mengenal lebih dekat Mitra Clima Pro, mitra terpercaya Anda dalam solusi panel listrik dan komponen kelistrikan industri.
        </p>
      </div>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '20px' }}>PT. Mitra Clima Electrindo</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              Mitra Clima Pro adalah penyedia layanan pembuatan panel listrik kustom, Motor Control Panel (MCP), panel power, serta distributor komponen kelistrikan industri terpercaya di Indonesia.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              Kami berkomitmen untuk menyediakan solusi kelistrikan yang aman, andal, dan efisien untuk berbagai skala industri. Dengan dukungan teknisi yang berpengalaman dan penggunaan komponen tier-1 dari merek global terkemuka, kami memastikan setiap panel yang diproduksi memenuhi standar kualitas dan keamanan industri tertinggi.
            </p>
            <a href="/profil-perusahaan.pdf" download className="btn-primary" style={{ display: 'inline-flex', marginTop: '10px' }}>
              Download Profil Perusahaan
            </a>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src="/images/panel_front.png" alt="Pembuatan Panel Listrik" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>

        <div style={{ marginTop: '80px', display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🛡️</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Kualitas Terjamin</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Semua produk kami menggunakan komponen asli berkualitas dan bergaransi resmi.</p>
          </div>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚙️</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Tenaga Ahli</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Dikerjakan oleh teknisi profesional bersertifikat dengan standar perakitan tinggi.</p>
          </div>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚚</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Pengiriman Nasional</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Melayani pengiriman dan instalasi ke berbagai wilayah industri di seluruh Indonesia.</p>
          </div>
        </div>
      </div>
      
      <ContactSection />
    </>
  );
}
