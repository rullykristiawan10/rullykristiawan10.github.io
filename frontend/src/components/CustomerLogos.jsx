import React from 'react';

// Real official customer logos downloaded directly from dwimitrateknindo.com
const customerList = [
  { id: 'dairygold', name: 'Dairygold', src: '/images/customers/dairygold.png', category: 'F&B Manufaktur' },
  { id: 'kino', name: 'Kino Indonesia', src: '/images/customers/kino.png', category: 'Consumer Goods' },
  { id: 'kapal_api', name: 'Kapal Api Group', src: '/images/customers/kapal_api.png', category: 'F&B Industri' },
  { id: 'mayora', name: 'Mayora Indah', src: '/images/customers/mayora.png', category: 'Manufaktur' },
  { id: 'sampoerna', name: 'Sampoerna', src: '/images/customers/sampoerna.png', category: 'Industri' },
  { id: 'lapi', name: 'PT LAPI Laboratories', src: '/images/customers/lapi.png', category: 'Farmasi & Medis' },
  { id: 'cady', name: 'Cady Indonesia Sehat', src: '/images/customers/cady.png', category: 'Kesehatan' },
  { id: 'tmc', name: 'TMC Tirta Medical', src: '/images/customers/tmc.png', category: 'Layanan Medis' },
  { id: 'rsud_alihsan', name: 'RSUD Al-Ihsan Jabar', src: '/images/customers/rsud_alihsan.png', category: 'Rumah Sakit' },
  { id: 'nestle', name: 'Nestlé Indonesia', src: '/images/customers/nestle.png', category: 'F&B Multinasional' },
  { id: 'st_regis', name: 'The St. Regis', src: '/images/customers/st_regis.png', category: 'Komersial & Properti' },
  { id: 'biofarma', name: 'PT Bio Farma (Persero)', src: '/images/customers/biofarma.png', category: 'BUMN Farmasi' },
  { id: 'mangusada', name: 'RSD Mangusada', src: '/images/customers/mangusada.png', category: 'Rumah Sakit' },
  { id: 'smt', name: 'SMT Indonesia', src: '/images/customers/smt.png', category: 'Manufaktur Elektronik' },
  { id: 'sigma_bimed', name: 'PT. SIGMA BIMED', src: '/images/customers/sigma_bimed.png', category: 'Alat Kesehatan' },
  { id: 'pa_innovation', name: 'PA Innovation', src: '/images/customers/pa_innovation.png', category: 'Teknologi' }
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
