import { Link } from 'react-router-dom';

export default function PanelKontrolPage({ openModal, isFeatured }) {
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
              <article className="power-product-card">
                <div className="product-illustration">
                  <img src="/images/panel_kontrol_soft_starter.png" alt="Panel Kontrol Soft Starter" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                </div>
                <div className="product-tag">Soft Starter</div>
                <h3>Panel Kontrol Soft Starter</h3>
                <p>Solusi start motor bertahap untuk mengurangi torsi awal dan arus inrush pada aplikasi beban berat.</p>
                <div className="product-price">Mulai <span>Rp 3.200.000</span></div>
                <div className="product-actions">
                  <button className="btn-primary" onClick={() => openModal({name: 'Panel Kontrol Soft Starter', price: 3200000, cat: 'PANEL KONTROL', brand: 'DELTA', images: ['/images/panel_kontrol_soft_starter.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']})}>Lihat Detail</button>
                </div>
              </article>
              <article className="power-product-card">
                <div className="product-illustration">
                  <img src="/images/panel_kontrol_vfd.png" alt="Panel Kontrol VFD" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                </div>
                <div className="product-tag">VFD</div>
                <h3>Panel Kontrol VFD</h3>
                <p>Panel dengan Variable Frequency Drive (VFD) untuk kontrol kecepatan motor, efisiensi energi, dan soft stopping.</p>
                <div className="product-price">Mulai <span>Rp 4.500.000</span></div>
                <div className="product-actions">
                  <button className="btn-primary" onClick={() => openModal({name: 'Panel Kontrol VFD', price: 4500000, cat: 'PANEL KONTROL', brand: 'INVT', images: ['/images/panel_kontrol_vfd.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']})}>Lihat Detail</button>
                </div>
              </article>
              <article className="power-product-card">
                <div className="product-illustration">
                  <img src="/images/panel_kontrol_plc.png" alt="Panel Kontrol PLC" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                </div>
                <div className="product-tag">PLC</div>
                <h3>Panel Kontrol PLC</h3>
                <p>Panel otomatisasi berbasis PLC untuk logika kendali, integrasi sensor, dan pengoperasian sequensial.</p>
                <div className="product-price">Mulai <span>Rp 2.800.000</span></div>
                <div className="product-actions">
                  <button className="btn-primary" onClick={() => openModal({name: 'Panel Kontrol PLC', price: 2800000, cat: 'PANEL KONTROL', brand: 'OMRON', images: ['/images/panel_kontrol_plc.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']})}>Lihat Detail</button>
                </div>
              </article>
              <article className="power-product-card">
                <div className="product-illustration">
                  <img src="/images/panel_remote_monitoring.png" alt="Panel Remote Monitoring" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                </div>
                <div className="product-tag">Monitoring</div>
                <h3>Panel Remote Monitoring</h3>
                <p>Panel dengan modul monitoring jarak jauh untuk pemantauan status, alarm, dan data historis via GSM/Cloud.</p>
                <div className="product-price">Mulai <span>Rp 1.050.000</span></div>
                <div className="product-actions">
                  <button className="btn-primary" onClick={() => openModal({name: 'Panel Remote Monitoring', price: 1050000, cat: 'PANEL KONTROL', brand: 'CUSTOM', images: ['/images/panel_remote_monitoring.png', '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png']})}>Lihat Detail</button>
                </div>
              </article>
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
