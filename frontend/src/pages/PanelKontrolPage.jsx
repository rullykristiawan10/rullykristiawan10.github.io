import { Link } from 'react-router-dom';

const kontrolProducts = [
  {
    name: 'Panel Kontrol Soft Starter',
    desc: 'Solusi start motor bertahap untuk mengurangi torsi awal dan arus inrush pada aplikasi beban berat.',
    price: 3200000,
    tag: 'Soft Starter',
    img_src: '/images/panel_kontrol_soft_starter.png',
    brand: 'DELTA',
    images: ['/images/panel_kontrol_soft_starter.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']
  },
  {
    name: 'Panel Kontrol VFD',
    desc: 'Panel dengan Variable Frequency Drive (VFD) untuk kontrol kecepatan motor, efisiensi energi, dan soft stopping.',
    price: 4500000,
    tag: 'VFD',
    img_src: '/images/panel_kontrol_vfd.png',
    brand: 'INVT',
    images: ['/images/panel_kontrol_vfd.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']
  },
  {
    name: 'Panel Kontrol PLC',
    desc: 'Panel otomatisasi berbasis PLC untuk logika kendali, integrasi sensor, dan pengoperasian sequensial.',
    price: 2800000,
    tag: 'PLC',
    img_src: '/images/panel_kontrol_plc.png',
    brand: 'OMRON',
    images: ['/images/panel_kontrol_plc.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']
  },
  {
    name: 'Panel Remote Monitoring',
    desc: 'Panel dengan modul monitoring jarak jauh untuk pemantauan status, alarm, dan data historis via GSM/Cloud.',
    price: 1050000,
    tag: 'Monitoring',
    img_src: '/images/panel_remote_monitoring.png',
    brand: 'CUSTOM',
    images: ['/images/panel_remote_monitoring.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']
  }
];

export default function PanelKontrolPage({ openModal, isFeatured, products = [] }) {
  const apiKontrolProducts = products.filter(p => p.type === 'motor' || p.type === 'controls' || (p.cat && (p.cat.toUpperCase().includes('KONTROL') || p.cat.toUpperCase().includes('MOTOR'))));
  
  const formattedApiProducts = apiKontrolProducts.map(p => {
    let parts = [];
    if (typeof p.parts === 'string') {
      try { parts = JSON.parse(p.parts); } catch(e) {}
    } else if (Array.isArray(p.parts)) {
      parts = p.parts;
    }
    
    return {
      id: p.id,
      name: p.name || p.title,
      desc: p.desc || p.excerpt || p.description,
      price: p.price,
      tag: p.tag || 'Kontrol',
      brand: p.brand || 'GENERAL',
      svg: <img src={p.img_src || (p.images && (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])) || "/images/motor_control_panel.png"} alt={p.name || p.title} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />,
      images: p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : (p.img_src ? [p.img_src] : []),
      parts: parts,
      stock: p.stock
    };
  });

  const apiProductNames = new Set(formattedApiProducts.map(p => p.name.toLowerCase()));
  const filteredHardcoded = kontrolProducts.filter(p => !apiProductNames.has(p.name.toLowerCase()));
  
  const allItems = [...formattedApiProducts, ...filteredHardcoded];
  const items = isFeatured ? allItems.slice(0, 4) : allItems;

  return (
    <div style={isFeatured ? {} : { paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      <section id="section-rakit" style={isFeatured ? {} : { paddingTop: '40px' }}>
        <div className="section-power-inner">
          <div className="section-power-products">
            <div className="power-intro">
              <span className="section-label">🔧 Panel Kontrol</span>
              <h2>Solusi Panel Kontrol Motor & Listrik Andal</h2>
              <p>Pilih panel kontrol siap pakai untuk operasi motor, sistem distribusi, dan otomatisasi industri. Dirancang untuk keamanan, efisiensi, dan kemudahan instalasi.</p>
            </div>
            <div className="power-products-grid rakit-grid">
              {items.map((p, idx) => (
                <article key={idx} className="power-product-card">
                  <div className="product-illustration">
                    {p.svg}
                  </div>
                  <div className="product-tag">{p.tag}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="product-price">Mulai <span>{formatRp(p.price)}</span></div>
                  <div className="product-actions">
                    <button className="btn-primary" onClick={(e) => { e.preventDefault(); openModal({name: p.name, price: p.price, cat: 'PANEL KONTROL', brand: p.brand || 'GENERAL', voltage: p.voltage, phase: p.phase, desc: p.desc, images: p.images, parts: p.parts}); }}>Lihat Detail</button>
                  </div>
                </article>
              ))}
            </div>
            
            {isFeatured && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/panel-kontrol" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
                  Lihat Semua Panel Kontrol
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
