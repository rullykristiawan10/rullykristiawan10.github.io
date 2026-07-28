import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import FloatingWA from './components/FloatingWA';
import Home from './pages/Home';
import CustomPanelPage from './pages/CustomPanelPage';
import PanelPowerPage from './pages/PanelPowerPage';
import PanelKontrolPage from './pages/PanelKontrolPage';
import KomponenPage from './pages/KomponenPage';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import LayananPage from './pages/LayananPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const formatRp = (n) => 'Rp ' + n.toLocaleString('id-ID');

function buildDefaultParts(p) {
  if (p.parts && p.parts.length > 0) return p.parts;
  
  if (p.method === 'DOL') {
    return [
      { name: p.brand === 'CHINT' ? 'NXB-63 3P C4 4kA (CHINT)' : 'MCB 3P Main Breaker', qty: 1, price: 'Rp 150.458', notes: 'Main Breaker' },
      { name: p.brand === 'CHINT' ? 'NC1 Series (CHINT)' : 'Kontaktor Utama', qty: 1, price: 'Rp 157.000', notes: 'Kontaktor start motor' },
      { name: p.brand === 'CHINT' ? 'NR2 Series (CHINT)' : 'Thermal Overload Relay', qty: 1, price: 'Rp 205.000', notes: 'Proteksi Overload' },
      { name: 'Pilot Lamp Merah 22mm', qty: 1, price: 'Rp 16.200', notes: 'Indikator Run' },
      { name: 'Pilot Lamp Hijau 22mm', qty: 1, price: 'Rp 16.200', notes: 'Indikator Stop' },
      { name: 'Push Button Hijau 22mm', qty: 1, price: 'Rp 17.800', notes: 'Tombol Start' },
      { name: 'Push Button Merah 22mm', qty: 1, price: 'Rp 17.800', notes: 'Tombol Stop' },
      { name: 'Panel Box Indoor 30x40x20', qty: 1, price: 'Rp 290.000', notes: 'Enclosure panel' },
      { name: 'Engineering, Wiring & QC', qty: 1, price: 'Rp 390.000', notes: 'Jasa perakitan panel' }
    ];
  }
  if (p.method === 'Star-Delta') {
    return [
      { name: 'Main Breaker', qty: 1, price: 'Rp 220.000', notes: 'Pemutus utama panel' },
      { name: 'Kontaktor Star', qty: 1, price: 'Rp 175.000', notes: 'Kontaktor untuk mode star' },
      { name: 'Kontaktor Delta', qty: 1, price: 'Rp 175.000', notes: 'Kontaktor untuk mode delta' },
      { name: 'Timer Star-Delta', qty: 1, price: 'Rp 95.000', notes: 'Pengatur waktu perpindahan' },
      { name: 'Proteksi Overload', qty: 1, price: 'Rp 235.000', notes: 'Pelindung arus lebih' },
      { name: 'Pilot Lamp', qty: 2, price: 'Rp 32.400', notes: 'Indikator status motor' },
      { name: 'Push Button', qty: 2, price: 'Rp 35.600', notes: 'Start / Stop' },
      { name: 'Panel Box Indoor', qty: 1, price: 'Rp 320.000', notes: 'Enclosure panel' },
      { name: 'Engineering & Wiring', qty: 1, price: 'Rp 450.000', notes: 'Rakit, wiring, terminal, testing & QC' }
    ];
  }
  if (p.type === 'distribusi' || p.method === 'Distribusi') {
    return [
      { name: 'MCB / MCCB', qty: 1, price: 'Rp 320.000', notes: 'Pemutus distribusi utama' },
      { name: 'Busbar', qty: 1, price: 'Rp 180.000', notes: 'Saluran distribusi arus' },
      { name: 'Terminal', qty: 1, price: 'Rp 90.000', notes: 'Konektor kabel' },
      { name: 'Pilot Lamp', qty: 1, price: 'Rp 16.200', notes: 'Indikator status' },
      { name: 'Voltmeter / Amperemeter', qty: 1, price: 'Rp 95.000', notes: 'Monitoring listrik' },
      { name: 'KWh Meter', qty: 1, price: 'Rp 170.000', notes: 'Pengukuran energi' },
      { name: 'Panel Box Indoor', qty: 1, price: 'Rp 340.000', notes: 'Enclosure panel' },
      { name: 'Engineering & Wiring', qty: 1, price: 'Rp 420.000', notes: 'Rakit, wiring, terminal, testing & QC' }
    ];
  }
  if (p.cat === 'PANEL POWER' || p.tag === 'LVMDP' || p.tag === 'Power' || p.tag === 'Capacitor' || p.tag === 'Switchgear' || p.tag === 'UPS' || p.tag === 'Trafo' || p.tag === 'Genset' || p.tag === 'Busduct') {
    return [
      { name: 'ACB / MCCB Utama', qty: 1, price: 'Rp 4.500.000', notes: 'Pemutus sirkuit kapasitas besar' },
      { name: 'Busbar Tembaga Murni', qty: 1, price: 'Rp 1.200.000', notes: 'Distribusi arus utama' },
      { name: 'Digital Power Meter', qty: 1, price: 'Rp 1.850.000', notes: 'Monitoring parameter listrik cerdas' },
      { name: 'Current Transformer (CT)', qty: 3, price: 'Rp 180.000', notes: 'Sensor pembacaan arus' },
      { name: 'Pilot Lamp Indikator', qty: 3, price: 'Rp 25.000', notes: 'Indikator fasa R-S-T' },
      { name: 'Relay Proteksi', qty: 1, price: 'Rp 950.000', notes: 'Proteksi over/under voltage' },
      { name: 'Panel Free Standing', qty: 1, price: 'Rp 2.500.000', notes: 'Enclosure plat tebal 2mm' },
      { name: 'Engineering, Busbar & Wiring', qty: 1, price: 'Rp 2.800.000', notes: 'Rakit, bending busbar, & QC standard' }
    ];
  }
  if (p.cat === 'PANEL KONTROL' || p.type === 'controls') {
    let mainComponent = { name: 'Smart Controller Module', price: 'Rp 2.500.000', notes: 'Modul kontrol utama' };
    if (p.method === 'Soft-Starter') mainComponent = { name: 'Soft Starter Module', price: 'Rp 3.200.000', notes: 'Modul soft start/stop motor' };
    else if (p.method === 'VFD') mainComponent = { name: 'Variable Frequency Drive (VFD)', price: 'Rp 4.500.000', notes: 'Inverter pengatur kecepatan motor' };
    else if (p.method === 'PLC') mainComponent = { name: 'Programmable Logic Controller (PLC)', price: 'Rp 3.800.000', notes: 'Modul kontrol logika otomatisasi' };
    else if (p.method === 'Monitoring') mainComponent = { name: 'IoT / GSM Gateway Module', price: 'Rp 1.500.000', notes: 'Modul transmisi data jarak jauh' };

    return [
      { name: 'MCB Kontrol / Proteksi', qty: 1, price: 'Rp 120.000', notes: 'Pemutus arus hubung singkat' },
      { ...mainComponent, qty: 1 },
      { name: 'Kontaktor / Relay Bypass', qty: 1, price: 'Rp 280.000', notes: 'Saklar elektromagnetik utama' },
      { name: 'Power Supply 24VDC', qty: 1, price: 'Rp 350.000', notes: 'Catu daya komponen kontrol' },
      { name: 'Terminal & Aksesoris Wiring', qty: 1, price: 'Rp 150.000', notes: 'Konektor dan pelindung kabel' },
      { name: 'Cooling Fan & Filter', qty: 1, price: 'Rp 180.000', notes: 'Pendingin khusus sirkulasi udara' },
      { name: 'Panel Box Wallmount', qty: 1, price: 'Rp 450.000', notes: 'Enclosure plat standar industri' },
      { name: 'Programming, Setting & Wiring', qty: 1, price: 'Rp 800.000', notes: 'Input parameter, integrasi & QC' }
    ];
  }
  
  // If it's explicitly a component (has supplier) or doesn't match product categories, return empty parts.
  if (p.supplier || !p.components) {
    return [];
  }

  return [{ name: 'Komponen panel lengkap', qty: 1, price: 'Rp 0', notes: 'Rakit sesuai kebutuhan' }];
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [products, setProducts] = useState([]);
  const [components, setComponents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [search, setSearch] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalParts, setModalParts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Advanced Feature: Toast Notification
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
      
    fetch('/api/components')
      .then(res => res.json())
      .then(data => setComponents(data))
      .catch(err => console.error("Error fetching components:", err));

    fetch('/api/blogs')
      .then(res => res.ok ? res.json() : [])
      .then(data => setBlogs(data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let interval;
    if (modalOpen && modalData) {
      const isDist = modalData.type === 'distribusi' || modalData.cat === 'PANEL DISTRIBUSI' || (modalData.name && modalData.name.toLowerCase().includes('distribusi'));
      const isMotor = modalData.type === 'motor' || modalData.cat === 'PANEL KONTROL' || modalData.cat === 'PANEL MOTOR' || (modalData.name && modalData.name.toLowerCase().includes('motor'));
      const numImages = modalData.images ? modalData.images.length : (isDist ? 4 : isMotor ? 4 : 5);
      
      if (numImages > 1) {
        interval = setInterval(() => {
          setActiveImageIndex(prev => (prev + 1) % numImages);
        }, 3000);
      }
    }
    return () => clearInterval(interval);
  }, [modalOpen, modalData]);

  const openModal = (product) => {
    setModalData(product);
    setModalParts(buildDefaultParts(product));
    setActiveImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    document.body.style.overflow = '';
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleModalPartQty = (index, delta) => {
    setModalParts(prev => {
      const next = [...prev];
      const part = next[index];
      const maxQty = typeof part.stock === 'number' ? part.stock : 9999;
      next[index] = { ...part, qty: Math.min(maxQty, Math.max(1, (part.qty || 1) + delta)) };
      return next;
    });
  };

  const calculatedPanelPrice = modalData?.supplier ? 0 : modalParts.reduce((sum, item) => {
    const p = item.price ? Number(String(item.price).replace(/[^0-9]/g, '')) : 0;
    return sum + ((item.qty || 1) * p);
  }, 0);
  const displayPrice = calculatedPanelPrice > 0 ? calculatedPanelPrice : (modalData?.price || 0);

  const addToCart = () => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === modalData.name);
      if (existing) {
        return prev.map(item => item.name === modalData.name ? { ...item, qty: (item.qty || 1) + 1 } : item);
      }
      return [...prev, { ...modalData, parts: modalParts, price: displayPrice, qty: 1 }];
    });
    closeModal();
    triggerToast(`${modalData.name} ditambahkan ke keranjang!`);
  };

  const addVariantToCart = (variant) => {
    const variantName = `${modalData.name} - ${variant.name}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.name === variantName);
      if (existing) {
        return prev.map(item => item.name === variantName ? { ...item, qty: (item.qty || 1) + (variant.qty || 1) } : item);
      }
      let p = variant.price ? Number(String(variant.price).replace(/[^0-9]/g, '')) : 0;
      if (p === 0 && modalData.price) {
        p = Number(modalData.price);
      }
      return [...prev, { ...modalData, name: variantName, price: p, parts: [], qty: variant.qty || 1 }];
    });
    triggerToast(`${variant.name} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const renderModalSpecs = (p) => {
    if (!p) return null;
    return (
      <>
        {p.voltage && <div className="modal-spec"><div className="spec-key">Tegangan</div><div className="spec-val">{p.voltage} {p.phase}</div></div>}
        {p.kw !== undefined && <div className="modal-spec"><div className="spec-key">Daya Motor</div><div className="spec-val">{p.kw > 0 ? p.kw + ' kW' : '—'}</div></div>}
        {p.components && !p.supplier && <div className="modal-spec"><div className="spec-key">Jumlah Komponen</div><div className="spec-val">{p.components} komponen</div></div>}
        {p.method && <div className="modal-spec"><div className="spec-key">Metode Start</div><div className="spec-val">{p.method}</div></div>}
      </>
    );
  };

  // Calculate total items in cart (accounting for quantities)
  const cartTotalItems = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <div>
      {!isAdminRoute && (
        <>
          <Topbar />
          <Navbar cartCount={cartTotalItems} onSearch={setSearch} onCartClick={() => setCartOpen(true)} />
        </>
      )}
      
      <Routes>
        <Route path="/" element={<Home products={products} components={components} blogs={blogs} search={search} openModal={openModal} />} />
        <Route path="/custom-panel" element={<CustomPanelPage products={products} search={search} openModal={openModal} />} />
        <Route path="/panel-power" element={<PanelPowerPage openModal={openModal} products={products} components={components} />} />
        <Route path="/panel-kontrol" element={<PanelKontrolPage openModal={openModal} products={products} components={components} />} />
        <Route path="/komponen" element={<KomponenPage components={components} search={search} openModal={openModal} />} />
        <Route path="/blog" element={<BlogPage blogs={blogs} />} />
        <Route path="/blog/:slug" element={<BlogArticle blogs={blogs} />} />
        <Route path="/layanan/:id" element={<LayananPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isAdminRoute && <Footer />}

      {/* Modal */}
      {modalOpen && modalData && (
        <div className="modal-overlay show" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(10, 17, 40, 0.4)' }} onClick={(e) => { if(e.target.className.includes('modal-overlay')) closeModal(); }}>
          <div className="modal show animate-pop-in shadow-premium" style={{display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)'}}>
            <div className="modal-header">
              <div>
                <div className="cat-label" style={{fontSize:'11px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.8px',fontWeight:700}}>
                  {modalData.cat} · {modalData.brand}
                </div>
                <h2 style={{fontSize:'20px',fontWeight:800,marginTop:'4px'}}>{modalData.name}</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {(() => {
                const isDist = modalData.type === 'distribusi' || modalData.cat === 'PANEL DISTRIBUSI' || (modalData.name && modalData.name.toLowerCase().includes('distribusi'));
                const isMotor = modalData.type === 'motor' || modalData.cat === 'PANEL KONTROL' || modalData.cat === 'PANEL MOTOR' || (modalData.name && modalData.name.toLowerCase().includes('motor'));
                const images = modalData.images || (isDist ? [
                  '/images/dist_angled.png', '/images/dist_front.png', '/images/dist_inside.png', '/images/dist_side.png'
                ] : isMotor ? [
                  '/images/motor_angled.png', '/images/motor_front.png', '/images/motor_inside.png', '/images/motor_side.png'
                ] : [
                  '/images/panel_angled.png', '/images/panel_front.png', '/images/panel_inside.png', '/images/panel_side.png', '/images/panel_top.png'
                ]);
                return (
                  <div className="modal-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="modal-img">
                      <img src={images[activeImageIndex || 0]} alt="Panel Main" />
                    </div>
                    <div className="modal-thumbnails" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {images.map((src, idx) => (
                        <img 
                          key={idx} 
                          src={src} 
                          alt={`Thumb ${idx}`} 
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            width: '60px', 
                            height: '60px', 
                            objectFit: 'cover', 
                            borderRadius: '8px', 
                            cursor: 'pointer', 
                            border: (activeImageIndex || 0) === idx ? '2px solid var(--primary)' : '1px solid #DDE3ED',
                            padding: '4px',
                            background: '#fff',
                            flexShrink: 0
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
              <div className="modal-info">
                {modalData.method && <span className="method-tag">{modalData.method}</span>}
                <div className="modal-price-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="modal-price" style={{ margin: 0 }}>{formatRp(displayPrice)}</div>
                  </div>
                  {!(modalData?.supplier && modalParts && modalParts.length > 0) && modalData.stock !== undefined && modalData.stock !== null && (
                    <div style={{
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      fontWeight: 700, 
                      backgroundColor: (modalData.stock === 'kosong' || modalData.stock === '0' || modalData.stock === 0) ? '#fee2e2' : '#dcfce7',
                      color: (modalData.stock === 'kosong' || modalData.stock === '0' || modalData.stock === 0) ? '#ef4444' : '#10b981'
                    }}>
                      {(modalData.stock === 'kosong' || modalData.stock === '0' || modalData.stock === 0) ? 'Stok Habis' : 
                       (!isNaN(Number(modalData.stock)) && String(modalData.stock).trim() !== '') ? `Stok: ${modalData.stock}` : 
                       'Stok Tersedia'}
                    </div>
                  )}
                </div>
                <div className="modal-specs-grid">
                  {renderModalSpecs(modalData)}
                </div>
                
                {(modalData.desc || modalData.description || (!modalData.supplier && modalData.cat)) && (
                  <div className="modal-desc" style={{ marginTop: '15px', fontSize: '13.5px', color: 'var(--text)', lineHeight: '1.6', background: 'var(--bg-alt)', padding: '12px', borderRadius: '6px', borderLeft: '3px solid var(--accent)' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fungsi & Kegunaan</strong>
                    {modalData.desc || modalData.description || (
                       !modalData.supplier && modalData.cat === 'PANEL MOTOR' ? `Panel kontrol khusus untuk mengoperasikan dan memproteksi motor listrik ${modalData.kw ? modalData.kw + ' kW ' : ''}dari kerusakan akibat arus lebih (overcurrent), beban lebih (overload), atau gangguan fasa. Sangat ideal untuk pompa air, kompresor, blower, dan mesin produksi industri.` :
                       !modalData.supplier && modalData.cat === 'PANEL DISTRIBUSI' ? `Panel distribusi daya utama/sub-utama untuk membagi dan menyalurkan arus listrik ke berbagai beban secara aman. Dilengkapi dengan komponen pemutus sirkuit (Breaker) berkualitas untuk mencegah risiko korsleting dan kebakaran pada instalasi gedung atau pabrik.` :
                       !modalData.supplier && modalData.cat === 'PANEL KONTROL' ? `Panel sistem kontrol cerdas untuk kebutuhan otomatisasi industri tingkat lanjut. Didesain secara khusus untuk mempermudah operasional, efisiensi energi, dan monitoring kelistrikan dengan standar keamanan tinggi.` :
                       `Panel listrik berkualitas tinggi berstandar industri dengan komponen tier-1 untuk menjamin durabilitas dan keamanan instalasi kelistrikan Anda.`
                    )}
                  </div>
                )}
                
                {modalParts && modalParts.length > 0 && (
                  <div className="modal-component-list" style={{ marginTop: '20px' }}>
                    <div className="component-list-title" style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{modalData?.supplier ? 'Varian' : 'Daftar Komponen'}</div>
                  <div className="component-table-wrapper" style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <table className="component-list-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead style={{ background: 'var(--bg-alt)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                          <th>{modalData?.supplier ? 'Varian' : 'Komponen'}</th>
                          <th style={{ textAlign: 'center' }}>Stok</th>
                          <th style={{ textAlign: 'center' }}>Qty</th>
                          {modalData?.supplier && <th style={{ textAlign: 'center' }}>Aksi</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {modalParts.map((item, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 600 }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>
                              {item.stock === 'kosong' || item.stock === 0 ? (
                                <span style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Kosong</span>
                              ) : (
                                <span style={{ background: '#f0fdf4', color: '#22c55e', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{typeof item.stock === 'number' ? `Ready (${item.stock} pcs)` : 'Ready'}</span>
                              )}
                            </td>
                            <td className="qty" style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'var(--bg-alt)', borderRadius: '4px', padding: '4px' }}>
                                <button type="button" onClick={() => handleModalPartQty(i, -1)} disabled={item.stock === 'kosong' || item.stock === 0} style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--border)', background: item.stock === 'kosong' || item.stock === 0 ? '#f3f4f6' : '#fff', cursor: item.stock === 'kosong' || item.stock === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: item.stock === 'kosong' || item.stock === 0 ? 0.5 : 1 }}>-</button>
                                <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px', opacity: item.stock === 'kosong' || item.stock === 0 ? 0.5 : 1 }}>{item.qty}</span>
                                <button type="button" onClick={() => handleModalPartQty(i, 1)} disabled={item.stock === 'kosong' || item.stock === 0 || (typeof item.stock === 'number' && item.qty >= item.stock)} style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--border)', background: item.stock === 'kosong' || item.stock === 0 || (typeof item.stock === 'number' && item.qty >= item.stock) ? '#f3f4f6' : '#fff', cursor: item.stock === 'kosong' || item.stock === 0 || (typeof item.stock === 'number' && item.qty >= item.stock) ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: item.stock === 'kosong' || item.stock === 0 || (typeof item.stock === 'number' && item.qty >= item.stock) ? 0.5 : 1 }}>+</button>
                              </div>
                            </td>
                            {modalData?.supplier && (
                              <td style={{ textAlign: 'center' }}>
                                <button type="button" onClick={() => addVariantToCart(item)} disabled={item.stock === 'kosong' || item.stock === 0} style={{ background: item.stock === 'kosong' || item.stock === 0 ? '#9ca3af' : 'var(--primary)', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: item.stock === 'kosong' || item.stock === 0 ? 'not-allowed' : 'pointer', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ Beli</button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
                
                <div id="mFeats">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '15px' }}>
                    {modalParts.slice(0, 3).map((item, i) => (
                      <span key={i} className="feat" style={{ fontSize: '12px', padding: '4px 10px' }}>
                        <svg viewBox="0 0 24 24" width="11" height="11" stroke="var(--green)" fill="none" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-whatsapp" onClick={() => window.open(`https://wa.me/6281933620432?text=Halo, saya tertarik dengan ${modalData.name}`)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Tanya via WhatsApp
              </button>
              {!(modalData?.supplier && modalParts && modalParts.length > 0) && (
                <button 
                  className="btn-cart" 
                  onClick={addToCart}
                  disabled={modalData.stock === 'kosong' || modalData.stock === 0}
                  style={{ background: (modalData.stock === 'kosong' || modalData.stock === 0) ? '#9ca3af' : '', cursor: (modalData.stock === 'kosong' || modalData.stock === 0) ? 'not-allowed' : 'pointer' }}
                >
                  {modalData.stock === 'kosong' || modalData.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems} 
        onRemove={removeFromCart} 
      />

      {/* Advanced Feature: Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: showToast ? 'translate(-50%, 0)' : 'translate(-50%, 100px)', background: 'var(--dark)', color: 'white', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 9999, opacity: showToast ? 1 : 0, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--green)" fill="none" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span style={{ fontWeight: 600 }}>{toastMessage}</span>
      </div>

      {!isAdminRoute && <FloatingWA />}
    </div>
  );
}
