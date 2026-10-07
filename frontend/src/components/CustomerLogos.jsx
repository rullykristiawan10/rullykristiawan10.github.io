import React from 'react';

// Real customer logos mapped with exact company names
const customerList = [
  { id: 'mayora', name: 'PT Mayora Indah Tbk', src: '/images/customers/mayora.png', category: 'F&B Manufaktur' },
  { id: 'soho', name: 'SOHO Global Health', src: '/images/customers/soho.png', category: 'Farmasi & Medis' },
  { id: 'tmc', name: 'TMC (Tirta Medical Centre)', src: '/images/customers/tmc.png', category: 'Layanan Kesehatan' },
  { id: 'dexa_medica', name: 'PT Dexa Medica', src: '/images/customers/dexa_medica.png', category: 'Farmasi & Medis' },
  { id: 'sampoerna', name: 'PT HM Sampoerna Tbk', src: '/images/customers/sampoerna.png', category: 'Industri' },
  { id: 'kapal_api', name: 'Kapal Api Group', src: '/images/customers/kapal_api.png', category: 'F&B Industri' },
  { id: 'ncu', name: 'PT Nugi Cahaya Utama (NCU)', src: '/images/customers/ncu.png', category: 'Kelistrikan & Industri' },
  { id: 'santos_jaya_abadi', name: 'PT Santos Jaya Abadi', src: '/images/customers/santos_jaya_abadi.png', category: 'F&B Manufaktur' },
  { id: 'darya_varia', name: 'PT Darya-Varia Laboratoria Tbk', src: '/images/customers/darya_varia.png', category: 'Farmasi & Medis' },
  { id: 'marin_liza', name: 'Marin Liza Group', src: '/images/customers/marin_liza.png', category: 'Gedung & Komersial' },
  { id: 'lapi', name: 'PT LAPI Laboratories', src: '/images/customers/lapi.png', category: 'Farmasi' },
  { id: 'dairygold', name: 'Dairygold', src: '/images/customers/dairygold.png', category: 'Manufaktur' },
  { id: 'nabati', name: 'PT Kaldu Sari Nabati', src: '/images/customers/nabati.png', category: 'Consumer Goods' },
  { id: 'pupuk_kujang', name: 'PT Pupuk Kujang Cikampek', src: '/images/customers/pupuk_kujang.png', category: 'BUMN Industri' },
  { id: 'kino', name: 'PT Kino Indonesia Tbk', src: '/images/customers/kino.png', category: 'Consumer Goods' },
  { id: 'c3_cady', name: 'Cady Indonesia Sehat', src: '/images/customers/c3_cady.png', category: 'Kesehatan' }
];

export default function CustomerLogos({ 
  title = "BEBERAPA KLIEN & PELANGGAN KAMI", 
  subtitle = "PT. MITRA CLIMA ELECTRINDO telah dipercaya melayani perakitan & instalasi panel listrik untuk berbagai sektor industri, gedung komersial, dan rumah sakit di seluruh Indonesia." 
}) {
  const halfLength = Math.ceil(customerList.length / 2);
  const row1 = [...customerList.slice(0, halfLength), ...customerList.slice(0, halfLength), ...customerList.slice(0, halfLength)];
  const row2 = [...customerList.slice(halfLength), ...customerList.slice(halfLength), ...customerList.slice(halfLength)];

  return (
    <section className="customer-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        <div className="customer-badge-pill">
          <span className="badge-dot"></span>
          <span>SOME OF OUR CUSTOMER</span>
        </div>
        
        <h2 className="customer-title">
          {title}
        </h2>
        
        <p className="customer-subtitle">
          {subtitle}
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee Container */}
      <div className="customer-marquee-wrapper">
        {/* Row 1 - Moving Left */}
        <div className="customer-marquee-track track-left">
          {row1.map((item, idx) => (
            <div key={`r1-${item.id}-${idx}`} className="client-logo-card" title={`${item.name} - ${item.category}`}>
              <div className="client-logo-inner">
                <img 
                  src={item.src} 
                  alt={item.name} 
                  className="client-logo-img" 
                  loading="lazy"
                />
              </div>
              <span className="client-logo-name">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Moving Right */}
        <div className="customer-marquee-track track-right">
          {row2.map((item, idx) => (
            <div key={`r2-${item.id}-${idx}`} className="client-logo-card" title={`${item.name} - ${item.category}`}>
              <div className="client-logo-inner">
                <img 
                  src={item.src} 
                  alt={item.name} 
                  className="client-logo-img" 
                  loading="lazy"
                />
              </div>
              <span className="client-logo-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="container" style={{ marginTop: '45px' }}>
        <div className="customer-stats-grid">
          <div className="customer-stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Proyek Instalasi Selesai</div>
          </div>
          <div className="customer-stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Komponen Original & Bergaransi</div>
          </div>
          <div className="customer-stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Klien Industri & Korporasi</div>
          </div>
          <div className="customer-stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Layanan Dukungan & QC</div>
          </div>
        </div>
      </div>
    </section>
  );
}
