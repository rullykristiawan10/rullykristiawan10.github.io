import { useEffect } from 'react';

const portfolios = [
  {
    id: 1,
    title: 'Perakitan Panel LVMDP 2000A',
    client: 'Pabrik Manufaktur, Cikarang',
    desc: 'Desain dan perakitan panel Low Voltage Main Distribution Panel (LVMDP) kapasitas 2000A untuk kebutuhan perluasan pabrik.',
    img: '/images/dist_angled.png'
  },
  {
    id: 2,
    title: 'Motor Control Center (MCC) Panel',
    client: 'Industri Pengolahan Air, Tangerang',
    desc: 'Panel kontrol motor terpusat dilengkapi dengan sistem proteksi cerdas dan Inverter/VSD untuk efisiensi energi.',
    img: '/images/motor_front.png'
  },
  {
    id: 3,
    title: 'Panel Kapasitor Bank (PFC)',
    client: 'Gedung Perkantoran, Jakarta',
    desc: 'Pembuatan panel Capacitor Bank otomatis untuk memperbaiki faktor daya (cos phi) dan menghemat tagihan listrik bulanan.',
    img: '/images/panel_side.png'
  },
  {
    id: 4,
    title: 'Panel Sinkronisasi Genset',
    client: 'Rumah Sakit Swasta, Bekasi',
    desc: 'Panel kontrol sinkronisasi untuk menjamin transisi daya listrik yang mulus (seamless) tanpa jeda saat pemadaman.',
    img: '/images/lvmdp_panel.png'
  },
  {
    id: 5,
    title: 'Panel Distribusi Sub-Distribution',
    client: 'Kawasan Industri, Karawang',
    desc: 'Perakitan panel distribusi sub-utama (SDP) berstandar tinggi menggunakan komponen full Schneider Electric.',
    img: '/images/dist_inside.png'
  },
  {
    id: 6,
    title: 'Panel Kontrol Pompa Transfer',
    client: 'Apartemen, Depok',
    desc: 'Panel otomatisasi pompa air bersih (transfer & booster) dilengkapi sistem sensor level air mutakhir.',
    img: '/images/motor_inside.png'
  }
];

export default function PortofolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portofolio-page" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '15px', color: 'var(--text)' }}>Portofolio & Galeri Proyek</h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Kepercayaan klien adalah prioritas utama kami. Berikut adalah beberapa dokumentasi dari proyek perakitan panel listrik dan sistem kontrol yang telah berhasil kami kerjakan.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {portfolios.map((item, index) => (
            <div key={item.id} className="glass-panel shadow-premium animate-fade-in-up" style={{ 
              borderRadius: '12px', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animationDelay: `${index * 0.1}s`
            }}>
              <div style={{ 
                height: '240px', 
                backgroundColor: 'var(--bg-alt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                borderBottom: '1px solid var(--border)'
              }}>
                <img src={item.img} alt={item.title} style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  transition: 'transform 0.4s ease'
                }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--text)', lineHeight: '1.4' }}>{item.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {item.client}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  {item.desc}
                </p>
                <a href="https://wa.me/6281933620432?text=Halo, saya tertarik membuat panel seperti di galeri portofolio Anda." target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                  Konsultasikan Proyek Serupa
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
