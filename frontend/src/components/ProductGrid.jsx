import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const formatRp = (n) => 'Rp ' + (Number(n) || 0).toLocaleString('id-ID');

function getPanelSVG() {
  return (
    <svg className="panel-svg" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="4" width="94" height="122" rx="6" fill="#EEF3FF" stroke="#C4D3F0" strokeWidth="1.5"/>
      <rect x="14" y="12" width="82" height="110" rx="4" fill="white" stroke="#DDE3ED" strokeWidth="1"/>
      <rect x="20" y="20" width="70" height="18" rx="3" fill="#0B3D91" opacity=".12"/>
      <rect x="22" y="23" width="28" height="12" rx="2" fill="#0B3D91" opacity=".7"/>
      <rect x="54" y="23" width="10" height="12" rx="2" fill="#CBD5E1"/>
      <rect x="68" y="23" width="10" height="12" rx="2" fill="#CBD5E1"/>
      <circle cx="35" cy="55" r="10" fill="none" stroke="#0B3D91" strokeWidth="2"/>
      <circle cx="35" cy="55" r="6" fill="#0B3D91" opacity=".2"/>
      <circle cx="35" cy="55" r="3" fill="#0B3D91"/>
      <rect x="54" y="46" width="32" height="8" rx="2" fill="#F3F6FC" stroke="#DDE3ED" strokeWidth="1"/>
      <rect x="54" y="58" width="24" height="8" rx="2" fill="#F3F6FC" stroke="#DDE3ED" strokeWidth="1"/>
      <rect x="54" y="70" width="28" height="8" rx="2" fill="#F3F6FC" stroke="#DDE3ED" strokeWidth="1"/>
      <circle cx="28" cy="92" r="5" fill="#15803d" opacity=".7"/>
      <circle cx="42" cy="92" r="5" fill="#F4A300" opacity=".7"/>
      <circle cx="56" cy="92" r="5" fill="#E24B4A" opacity=".7"/>
      <rect x="20" y="108" width="70" height="6" rx="2" fill="#EEF3FF" stroke="#DDE3ED"/>
    </svg>
  );
}

export default function ProductGrid({ products, search, openModal, isFeatured }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeBrands, setActiveBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [selectedDaya, setSelectedDaya] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [sortValue, setSortValue] = useState('default');

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (activeTab !== 'all' && p.type !== activeTab) return false;
      if (activeBrands.length > 0 && !activeBrands.includes(p.brand)) return false;
      if (maxPrice < 20000000 && p.price > maxPrice) return false;
      
      if (selectedDaya.length > 0) {
        const ok = selectedDaya.some(d => {
          if (d === '0-2') return p.kw > 0 && p.kw <= 2;
          if (d === '2-5') return p.kw > 2 && p.kw <= 5;
          if (d === '5-10') return p.kw > 5 && p.kw <= 10;
          if (d === '10+') return p.kw > 10 || p.kw === 0;
          return false;
        });
        if (!ok) return false;
      }
      
      if (selectedMethod.length > 0 && !selectedMethod.includes(p.method)) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      
      return true;
    });

    if (sortValue === 'price-asc') result.sort((a,b) => a.price - b.price);
    else if (sortValue === 'price-desc') result.sort((a,b) => b.price - a.price);
    else if (sortValue === 'power-asc') result.sort((a,b) => a.kw - b.kw);
    else if (sortValue === 'power-desc') result.sort((a,b) => b.kw - a.kw);

    return result;
  }, [products, activeTab, activeBrands, maxPrice, selectedDaya, selectedMethod, search, sortValue]);

  const toggleBrand = (b) => {
    setActiveBrands(prev => prev.includes(b) ? [] : [b]);
  };

  const toggleDaya = (val) => {
    setSelectedDaya(prev => prev.includes(val) ? [] : [val]);
  };

  const toggleMethod = (val) => {
    setSelectedMethod(prev => prev.includes(val) ? [] : [val]);
  };

  const resetFilters = () => {
    setActiveBrands([]);
    setMaxPrice(20000000);
    setSelectedDaya([]);
    setSelectedMethod([]);
    setActiveTab('all');
  };

  const displayProducts = useMemo(() => {
    if (!isFeatured) return filtered;
    const targetBrands = ['HONEYWELL', 'SCHNEIDER', 'SIEMENS', 'CHINT'];
    const featured = [];
    targetBrands.forEach(brand => {
      const product = filtered.find(p => p.brand?.toUpperCase() === brand);
      if (product && !featured.includes(product)) featured.push(product);
    });
    if (featured.length < 4) {
      const remaining = filtered.filter(p => !featured.includes(p));
      featured.push(...remaining.slice(0, 4 - featured.length));
    }
    return featured;
  }, [filtered, isFeatured]);

  return (
    <div id="custom-panel">
      {!isFeatured && (
        <div className="tab-bar">
          <div className="tab-bar-label">Custom Panel</div>
          <div className="tab-inner">
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Semua Panel <span className="count">{products.length}</span>
            </button>
            <button className={`tab-btn ${activeTab === 'distribusi' ? 'active' : ''}`} onClick={() => setActiveTab('distribusi')}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
              Panel Distribusi <span className="count">{products.filter(p=>p.type==='distribusi').length}</span>
            </button>
            <button className={`tab-btn ${activeTab === 'motor' ? 'active' : ''}`} onClick={() => setActiveTab('motor')}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></svg>
              Panel Kontrol Motor <span className="count">{products.filter(p=>p.type==='motor').length}</span>
            </button>
          </div>
        </div>
      )}

      <div className={isFeatured ? "featured-main" : "main"} style={isFeatured ? { maxWidth: '1280px', margin: '0 auto', padding: '24px' } : {}}>
        {!isFeatured && (
          <aside className="sidebar" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', padding: 0 }}>
            <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10, padding: '24px 24px 16px 24px', borderBottom: '1px solid #F3F6FC', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              <div className="sidebar-title" style={{ margin: 0 }}>FILTER <button onClick={resetFilters}>Reset</button></div>
            </div>
            <div style={{ padding: '0 24px 24px 24px' }}>
            
            <div className="filter-group gradient-filter-banner">
              <div className="filter-label" style={{color: '#fff'}}>Daya</div>
              <p className="brand-filter-desc">Saring berdasarkan kapasitas daya motor.</p>
              <label className="filter-option"><input type="checkbox" checked={selectedDaya.includes('0-2')} onChange={() => toggleDaya('0-2')} /> 0 – 2 kW</label>
              <label className="filter-option"><input type="checkbox" checked={selectedDaya.includes('2-5')} onChange={() => toggleDaya('2-5')} /> 2 – 5 kW</label>
              <label className="filter-option"><input type="checkbox" checked={selectedDaya.includes('5-10')} onChange={() => toggleDaya('5-10')} /> 5 – 10 kW</label>
              <label className="filter-option"><input type="checkbox" checked={selectedDaya.includes('10+')} onChange={() => toggleDaya('10+')} /> &gt; 10 kW</label>
            </div>
            
            <div className="filter-divider"></div>
            
            <div className="filter-group gradient-filter-banner">
              <div className="filter-label" style={{color: '#fff'}}>Brand Komponen</div>
              <p className="brand-filter-desc">Pilih merk komponen prioritas untuk rakitan panel Anda.</p>
              <div className="brand-logo">
                {['HONEYWELL', 'CHINT', 'SCHNEIDER', 'WECON', 'SIEMENS'].map(b => (
                  <div key={b} className={`brand-chip ${activeBrands.includes(b) ? 'active' : ''}`} onClick={() => toggleBrand(b)}>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-divider"></div>
            
            <div className="filter-group gradient-filter-banner">
              <div className="filter-label" style={{color: '#fff'}}>Metode Start</div>
              <p className="brand-filter-desc">Saring panel berdasarkan sistem pengasutan.</p>
              <label className={`method-btn ${selectedMethod.includes('DOL') ? 'active' : ''}`}><input type="checkbox" checked={selectedMethod.includes('DOL')} onChange={() => toggleMethod('DOL')} /> Direct Online (DOL)</label>
              <label className={`method-btn ${selectedMethod.includes('Distribusi') ? 'active' : ''}`}><input type="checkbox" checked={selectedMethod.includes('Distribusi')} onChange={() => toggleMethod('Distribusi')} /> Distribusi</label>
              <label className={`method-btn ${selectedMethod.includes('Star-Delta') ? 'active' : ''}`}><input type="checkbox" checked={selectedMethod.includes('Star-Delta')} onChange={() => toggleMethod('Star-Delta')} /> Star-Delta (Y–Δ)</label>
            </div>
            
            <div className="filter-divider"></div>
            
            <div className="filter-group">
              <div className="filter-label">Harga Maksimal</div>
              <div className="price-range">
                <input type="range" min="500000" max="20000000" step="500000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className="price-labels">
                  <span>Rp 500rb</span>
                  <span>{maxPrice >= 20000000 ? 'Semua' : formatRp(maxPrice)}</span>
                </div>
              </div>
            </div>
            
            <div className="filter-divider"></div>
            <div style={{fontSize: '13.5px', color: 'var(--muted)'}}>
              Menampilkan <strong>{filtered.length}</strong> dari <strong>{products.length}</strong> panel
            </div>
            </div>
          </aside>
        )}

        <div style={isFeatured ? { width: '100%' } : {}}>
          {!isFeatured && (
            <div className="products-top">
              <div className="products-count">Menampilkan <strong>{filtered.length}</strong> produk</div>
              <div className="sort-wrap">
                <span className="sort-label">Urutkan:</span>
                <select className="sort-select" value={sortValue} onChange={e => setSortValue(e.target.value)}>
                  <option value="default">Terpopuler</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="power-asc">Daya Terendah</option>
                  <option value="power-desc">Daya Tertinggi</option>
                </select>
              </div>
            </div>
          )}

          <div className="product-grid" style={isFeatured ? { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' } : {}}>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <h3>Tidak ada produk ditemukan</h3>
                <p>Coba ubah filter atau kata kunci pencarian Anda.</p>
              </div>
            ) : (
              displayProducts.map((p, i) => (
                <div key={p.id || i} className="product-card glass-panel shadow-premium animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="card-top">
                    {p.kw > 0 && <div className="power-badge"><span>{p.kw < 10 ? p.kw : p.kw}kW</span><span className="unit">Motor</span></div>}
                  </div>
                  <div className="card-img">{getPanelSVG()}</div>
                  <div className="card-body">
                    <div className="card-cat">
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="cat-label">{p.cat}</span>
                        {p.stock === 'kosong' || p.stock === 0 ? (
                          <span style={{ fontSize: '10px', padding: '2px 6px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', fontWeight: 600 }}>Pre-Order</span>
                        ) : (
                          <span style={{ fontSize: '10px', padding: '2px 6px', background: '#dcfce7', color: '#15803d', borderRadius: '4px', fontWeight: 600 }}>Ready</span>
                        )}
                      </div>
                      <span className={`brand-badge ${p.brand === 'SCHNEIDER' || p.brand === 'SIEMENS' ? 'schneider' : ''}`}>{p.brand}</span>
                    </div>
                    <div className="card-name">{p.name}</div>
                    
                    <span className={`method-tag ${p.method === 'Star-Delta' ? 'star-delta' : p.method === 'Distribusi' ? 'dist' : ''}`}>
                      {p.method === 'DOL' ? '⚡ DIRECT ONLINE (DOL)' : p.method === 'Star-Delta' ? '🔄 STAR-DELTA' : '🔌 DISTRIBUSI'}
                    </span>
                    
                    <div className="features">
                      {p.features?.slice(0, 3).map((f, i) => (
                        <span key={i} className="feat">
                          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>{f}
                        </span>
                      ))}
                    </div>
                    
                    <div className="card-specs">
                      <span className="spec-item"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>{p.components} komponen</span>
                      <span className="spec-item"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>{p.voltage} {p.phase}</span>
                    </div>
                    <div className="card-price">
                      <div className="price-from">Mulai</div>
                      <span className="price-amount">{formatRp(p.price)}</span> <span className="price-unit">/set</span>
                    </div>
                    <button className="btn-detail" onClick={() => openModal(p)}>
                      Lihat Detail
                      <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {isFeatured && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/custom-panel" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
                Lihat Semua Custom Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
