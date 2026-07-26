import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const formatRp = (n) => 'Rp ' + n.toLocaleString('id-ID');

export const powerProducts = [
  { name: 'LVMDP Panel', desc: 'Low Voltage Main Distribution Panel untuk gedung komersial dan industri skala besar dengan kapasitas tinggi.', price: 25000000, tag: 'LVMDP', voltage: '380V', phase: '3-Phase', svg: <img src="/images/lvmdp_panel.png" alt="LVMDP Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/lvmdp_panel.png', '/images/panel_front.png', '/images/panel_inside.png', '/images/panel_side.png', '/images/panel_top.png'] },
  { name: 'Power Center Panel', desc: 'Pusat distribusi daya untuk fasilitas manufaktur dengan proteksi lengkap dan monitoring real-time.', price: 15000000, tag: 'Power', voltage: '380V', phase: '3-Phase', svg: <img src="/images/power_center_panel.png" alt="Power Center Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/power_center_panel.png', '/images/dist_front.png', '/images/dist_inside.png', '/images/dist_side.png', '/images/dist_top.png'] },
  { name: 'Capacitor Bank Panel', desc: 'Koreksi faktor daya otomatis untuk menghemat konsumsi energi dan mengurangi biaya listrik.', price: 18000000, tag: 'Capacitor', voltage: '380V', phase: '3-Phase', svg: <img src="/images/capacitor_bank_panel.png" alt="Capacitor Bank Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/capacitor_bank_panel.png', '/images/panel_angled.png', '/images/panel_inside.png', '/images/panel_side.png', '/images/panel_top.png'] },
  { name: 'Busduct Panel', desc: 'Sistem distribusi daya compact dengan efisiensi tinggi untuk gedung bertingkat dan data center.', price: 45000000, tag: 'Busduct', voltage: '380V', phase: '3-Phase', svg: <img src="/images/busduct_panel.png" alt="Busduct Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/busduct_panel.png', '/images/dist_angled.png', '/images/dist_inside.png', '/images/dist_side.png', '/images/dist_top.png'] },
  { name: 'Generator Control Panel', desc: 'Panel kontrol genset dengan Automatic Transfer Switch dan monitoring untuk sumber daya cadangan.', price: 30000000, tag: 'Genset', voltage: '380V', phase: '3-Phase', svg: <img src="/images/generator_control_panel.png" alt="Generator Control Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/generator_control_panel.png', '/images/motor_angled.png', '/images/motor_inside.png', '/images/motor_side.png'] },
  { name: 'Transformer Panel', desc: 'Panel proteksi dan distribusi untuk trafo step-up/step-down, cocok untuk gardu dan instalasi industri.', price: 40000000, tag: 'Trafo', voltage: '20kV / 380V', phase: '3-Phase', svg: <img src="/images/transformer_panel.png" alt="Transformer Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/transformer_panel.png', '/images/dist_front.png', '/images/dist_angled.png', '/images/dist_side.png', '/images/dist_top.png'] },
  { name: 'UPS & Backup Panel', desc: 'Solusi UPS terintegrasi untuk menjaga pasokan daya kritis pada fasilitas dan server room.', price: 25000000, tag: 'UPS', voltage: '380V', phase: '3-Phase', svg: <img src="/images/ups_backup_panel.png" alt="UPS & Backup Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/ups_backup_panel.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png'] },
  { name: 'Switchgear Panel', desc: 'Switchgear LV/MV untuk proteksi, isolasi, dan pengendalian distribusi daya pada instalasi besar.', price: 35000000, tag: 'Switchgear', voltage: '20kV', phase: '3-Phase', svg: <img src="/images/switchgear_panel.png" alt="Switchgear Panel" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />, images: ['/images/switchgear_panel.png', '/images/panel_angled.png', '/images/panel_front.png', '/images/panel_inside.png', '/images/panel_top.png'] }
];

export default function PanelPowerPage({ openModal, isFeatured }) {
  const items = isFeatured ? powerProducts.slice(0, 4) : powerProducts;

  return (
    <div style={isFeatured ? {} : { paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      {!isFeatured && (
        <Helmet>
          <title>Panel Power Industri | Mitra Clima Pro</title>
          <meta name="description" content="Temukan berbagai panel power industri terbaik dari Mitra Clima Pro, mulai dari LVMDP, Capacitor Bank, hingga Busduct dan Switchgear." />
          <meta name="keywords" content="panel power, lvmdp, capacitor bank, busduct, switchgear, mitra clima pro" />
          <meta property="og:title" content="Panel Power Industri | Mitra Clima Pro" />
          <meta property="og:description" content="Temukan berbagai panel power industri terbaik dengan garansi resmi dan komponen tier-1." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.mitraclimapro.com/panel-power" />
        </Helmet>
      )}
      <section id="section-power" className="section-power-hero" style={isFeatured ? {} : { paddingTop: '40px' }}>
        <div className="section-power-inner">
          <div className="section-power-products">
            <div className="power-intro">
              <span className="section-label">⚡ Panel Power Industri</span>
              <h2>Panel Power — Tenaga Andal untuk Setiap Instalasi</h2>
              <p>Dari LVMDP hingga Capacitor Bank, semua produk power panel kami menggunakan komponen tier‑1 dengan garansi resmi 1 tahun.</p>
            </div>
            <div className="power-products-grid">
              {items.map((p) => (
                <article key={p.name} className="power-product-card">
                  <div className="product-illustration">
                    {p.svg}
                  </div>
                  <div className="product-tag">{p.tag}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="product-price">Mulai <span>{formatRp(p.price)}</span></div>
                  <div className="product-actions">
                    <button className="btn-primary" onClick={(e) => { e.preventDefault(); openModal({name: p.name, price: p.price, cat: 'PANEL POWER', brand: 'SCHNEIDER', voltage: p.voltage, phase: p.phase, desc: p.desc, images: p.images}); }}>Lihat Detail</button>
                  </div>
                </article>
              ))}
            </div>
            
            {isFeatured && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/panel-power" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
                  Lihat Semua Panel Power
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
