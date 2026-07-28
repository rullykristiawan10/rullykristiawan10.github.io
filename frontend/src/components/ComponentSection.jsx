import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const formatRp = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function ComponentSection({ components, search, openModal, isFeatured }) {
  const [activeSupplier, setActiveSupplier] = useState('CHINT');
  const [activeTag, setActiveTag] = useState('Semua');
  const [sortValue, setSortValue] = useState('default');

  const filteredComponents = useMemo(() => {
    let result = [];
    
    // Extremely robust filtering
    for (let i = 0; i < components.length; i++) {
      const item = components[i];
      if (!item) continue;
      
      // 1. Supplier filter
      if (activeSupplier === 'Semua Supplier' || !activeSupplier) {
        // Keep all suppliers
      } else if (item.supplier !== activeSupplier) {
        continue;
      }
      
      // 2. Tag filter
      if (activeTag && activeTag !== 'Semua' && activeTag !== 'all') {
        if (item.tag !== activeTag) {
          continue;
        }
      }
      
      // 3. Search filter
      if (search && typeof search === 'string' && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        const n = (item.name || '').toLowerCase();
        const c = (item.category || '').toLowerCase();
        const d = (item.description || '').toLowerCase();
        const s = (item.supplier || '').toLowerCase();
        if (!n.includes(query) && !c.includes(query) && !d.includes(query) && !s.includes(query)) {
          continue;
        }
      }
      
      // Add to result
      result.push(item);
    }
    
    // Simple sort
    const tagsOrder = ['Semua', 'MCB', 'MCCB', 'KONTAKTOR', 'RELAY', 'PFR RELAY', 'HMI', 'POWER SUPPLY', 'PUSH BUTTON', 'HANDLE SELECT SWITCH', 'EMERGENCY STOP', 'PILOT LIGHT', 'BUZZER', 'TERMINAL BLOCKS', 'STOPPER TERMINAL BLOCK', 'THERMAL OVERLOAD RELAY'];
    
    result.sort((a, b) => {
      let indexA = tagsOrder.indexOf(a.category || '');
      let indexB = tagsOrder.indexOf(b.category || '');
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });

    return result;
  }, [components, activeSupplier, activeTag, search]);

  const featuredComponents = useMemo(() => {
    if (!isFeatured) return [];
    const brands = ['HONEYWELL', 'SCHNEIDER', 'SIEMENS', 'CHINT'];
    return brands.map(b => components.find(c => c.supplier === b)).filter(Boolean);
  }, [components, isFeatured]);

  const suppliers = ['HONEYWELL', 'CHINT', 'SIEMENS', 'SCHNEIDER', 'WECON'];
  const tags = ['Semua', 'MCB', 'MCCB', 'KONTAKTOR', 'RELAY', 'PFR RELAY', 'HMI', 'POWER SUPPLY', 'PUSH BUTTON', 'HANDLE SELECT SWITCH', 'EMERGENCY STOP', 'PILOT LIGHT', 'BUZZER', 'TERMINAL BLOCKS', 'STOPPER TERMINAL BLOCK', 'THERMAL OVERLOAD RELAY'];

  const getValidTags = (supplier) => {
    return tags.filter(t => !(supplier === 'CHINT' && (t === 'POWER SUPPLY' || t === 'HMI' || t === 'TERMINAL BLOCKS' || t === 'STOPPER TERMINAL BLOCK' || t === 'PUSH BUTTON' || t === 'EMERGENCY STOP')) && !(supplier === 'HONEYWELL' && (t === 'PFR RELAY' || t === 'HMI' || t === 'POWER SUPPLY')) && !(supplier === 'SIEMENS' && (t === 'RELAY' || t === 'PFR RELAY' || t === 'HANDLE SELECT SWITCH' || t === 'PILOT LIGHT' || t === 'BUZZER' || t === 'STOPPER TERMINAL BLOCK')) && !(supplier === 'SCHNEIDER' && (t === 'TERMINAL BLOCKS' || t === 'STOPPER TERMINAL BLOCK')) && !(supplier === 'WECON' && t !== 'HMI' && t !== 'Semua'));
  };

  const handleSupplierChange = (s) => {
    setActiveSupplier(s);
    const validTags = getValidTags(s);
    if (!validTags.includes(activeTag)) {
      setActiveTag('Semua');
    }
  };

  return (
    <section id="section-komponen" className="section-komponen">
      <div className="section-header komponen-header-banner">
        <div className="komponen-header-content">
          <span className="section-label">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            KOMPONEN
          </span>
          <h2 className="section-title">Katalog Komponen</h2>
          <p className="section-text">Temukan komponen listrik dan industri terlengkap — MCB, MCCB, kontaktor, relay, VFD, dan lainnya dari supplier terpercaya seperti CHINT, FORT, dan Schneider Electric.</p>
        </div>
        <div className="komponen-header-visual">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M30 40H70V60H30V40Z" fill="rgba(255,255,255,0.1)" />
            <path d="M40 30V70M60 30V70M30 50H70" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <rect x="42" y="42" width="16" height="16" fill="var(--accent)" rx="4" />
          </svg>
        </div>
      </div>
      <div className="komponen-body">
        <div className="komponen-main">
          {!isFeatured && (
            <>
              <div className="komponen-top">
            <div className="supplier-list">
              <span className="supplier-label">SUPPLIER</span>
              {suppliers.map(s => (
                <button
                  key={s}
                  className={`supplier-chip ${activeSupplier === s ? 'active' : ''}`}
                  onClick={() => handleSupplierChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="komponen-actions">
              <div className="komponen-summary">
                Menampilkan {filteredComponents.length} komponen dari {components.length} produk
              </div>
              <select className="komponen-sort" value={sortValue} onChange={e => setSortValue(e.target.value)}>
                <option value="default">Urutkan: Recommended</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
          </div>
          <div className="komponen-tag-row">
            {getValidTags(activeSupplier).map(t => (
              <button
                key={t}
                className={`komponen-tag ${activeTag === t ? 'active' : ''}`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
              </div>
            </>
          )}

          <div className="komponen-grid" style={isFeatured ? { gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' } : {}}>
            {(isFeatured ? featuredComponents : filteredComponents).length === 0 ? (
              <div className="empty-state komponen-empty">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <h3>Tidak ada komponen ditemukan</h3>
                <p>Coba ubah filter atau kata kunci pencarian.</p>
              </div>
            ) : (
              (isFeatured ? featuredComponents : filteredComponents).map((item, i) => {
                let imgSrc = null;
                if (item.images && item.images.length > 0 && item.images[0]) {
                  imgSrc = item.images[0];
                } else if (item.supplier === 'CHINT' && ['TERMINAL BLOCKS', 'STOPPER TERMINAL BLOCK', 'THERMAL OVERLOAD RELAY', 'BUZZER', 'PILOT LIGHT', 'EMERGENCY STOP', 'HANDLE SELECT SWITCH', 'PUSH BUTTON', 'RELAY', 'PFR RELAY', 'KONTAKTOR', 'MCCB', 'MCB'].includes(item.category)) {
                  imgSrc = item.category === 'BUZZER' ? '/images/NFM1-22.jpg' :
                    item.category === 'EMERGENCY STOP' ? '/images/372b5e0f4eb8280e59cb8b4177.jpg' :
                    item.category === 'PILOT LIGHT' ? '/images/P102225868-1.avif' :
                    item.category === 'HANDLE SELECT SWITCH' ? '/images/D_Q_NP_2X_949431-CBT111410429275_052026-P.webp' :
                    item.category === 'PUSH BUTTON' ? '/images/j2S004310686-2.jpg' :
                    item.category === 'RELAY' ? '/images/252648.webp' :
                    item.category === 'PFR RELAY' ? '/images/chint-njyb315-series-phase-failure-relay-pfr_1_380.jpg' :
                    item.category === 'KONTAKTOR' ? '/images/1f26ba00-70ba-4206-9324-429b6063be91.webp' :
                    item.category === 'MCCB' ? '/images/2438bddf-7321-47e4-aa3a-22270de4c415.png~tplv-aphluv4xwc-white-pad-v1_250_250.png' :
                    item.category === 'MCB' ? (item.name.includes('AX-5') ? '/images/chint-mcb-and-rccb-17-03-2021-145-222992492-8qese.jpg' : item.name.includes('1P') ? '/images/cf92acf5-101f-4d63-9956-09d4abaa092f.webp' : '/images/121af2eb-81f4-4d02-ba28-9d5597a23546.webp') :
                    `/images/comp_chint_${item.category.toLowerCase().replace(/ /g, '_')}.png`;
                } else if (item.supplier === 'HONEYWELL' && ['MCB', 'MCCB', 'KONTAKTOR', 'RELAY', 'PLC', 'HMI', 'POWER SUPPLY', 'PUSH BUTTON', 'HANDLE SELECT SWITCH', 'EMERGENCY STOP', 'PILOT LIGHT', 'BUZZER', 'TERMINAL BLOCKS', 'STOPPER TERMINAL BLOCK', 'THERMAL OVERLOAD RELAY'].includes(item.category)) {
                  imgSrc = item.category === 'MCB' ? (item.name.includes('Auxiliary') ? '/images/Picture1.jpg' : item.name.includes('1 Phase') ? '/images/Picture17.jpg' : item.name.includes('2 Phase') ? '/images/Picture22.jpg' : '/images/Picture18.jpg') :
                    item.category === 'PUSH BUTTON' ? (item.name.includes('Red') ? '/images/Picture2.jpg' : item.name.includes('Green') ? '/images/Picture3.jpg' : `/images/comp_honeywell_push_button.png`) :
                    item.category === 'HANDLE SELECT SWITCH' ? '/images/Picture4.jpg' :
                    item.category === 'EMERGENCY STOP' ? '/images/Picture5.jpg' :
                    item.category === 'PILOT LIGHT' ? (item.name.includes('Green') ? '/images/Picture7.jpg' : item.name.includes('Yellow') ? '/images/Picture8.jpg' : item.name.includes('White') ? '/images/Picture9.jpg' : item.name.includes('Blue') ? '/images/Picture10.jpg' : '/images/Picture6.jpg') :
                    item.category === 'BUZZER' ? '/images/Picture11.jpg' :
                    item.category === 'STOPPER TERMINAL BLOCK' ? '/images/Picture12.jpg' :
                    item.category === 'MCCB' ? '/images/Picture19.jpg' :
                    item.category === 'TERMINAL BLOCKS' ? (item.name.includes('35mm') ? '/images/Picture13.jpg' : item.name.includes('16mm') ? '/images/Picture14.jpg' : item.name.includes('10mm') ? '/images/Picture15.jpg' : item.name.includes('6mm') ? '/images/Picture16.jpg' : `/images/comp_honeywell_terminal_blocks.png`) :
                    item.category === 'KONTAKTOR' ? '/images/Picture21.jpg' :
                    item.category === 'THERMAL OVERLOAD RELAY' ? '/images/Picture20.jpg' :
                    `/images/comp_honeywell_${item.category.toLowerCase().replace(/ /g, '_')}.png`;
                } else if (item.supplier === 'SIEMENS' && ['BUZZER', 'EMERGENCY STOP', 'HMI', 'KONTAKTOR', 'PILOT LIGHT', 'MCB', 'MCCB', 'THERMAL OVERLOAD RELAY', 'PFR RELAY', 'POWER SUPPLY', 'PUSH BUTTON', 'RELAY', 'HANDLE SELECT SWITCH', 'STOPPER TERMINAL BLOCK', 'TERMINAL BLOCKS'].includes(item.category)) {
                  imgSrc = item.category === 'BUZZER' ? '/images/buzzer.jpg' :
                    item.category === 'EMERGENCY STOP' ? '/images/emergeny stop.jpg' :
                    item.category === 'HMI' ? '/images/hmi.jpg' :
                    item.category === 'KONTAKTOR' ? '/images/kontraktor.jpg' :
                    item.category === 'PILOT LIGHT' ? '/images/lampu.jpg' :
                    item.category === 'MCB' ? (item.name.includes('1 Phase') || item.name.includes('1P') ? '/images/mcb 1 phase.jpg' : '/images/siemens-32a-3-pole-mcb.jpg') :
                    item.category === 'MCCB' ? '/images/Y2247893-01.webp' :
                    item.category === 'THERMAL OVERLOAD RELAY' ? '/images/over load.jpg' :
                    item.category === 'PFR RELAY' ? '/images/Y7721215-01.jpg' :
                    item.category === 'POWER SUPPLY' ? '/images/power supplay.webp' :
                    item.category === 'PUSH BUTTON' ? '/images/push button.webp' :
                    item.category === 'RELAY' ? '/images/relay soket.webp' :
                    item.category === 'HANDLE SELECT SWITCH' ? '/images/select switch.webp' :
                    item.category === 'STOPPER TERMINAL BLOCK' ? '/images/stopper.jpg' :
                    item.category === 'TERMINAL BLOCKS' ? '/images/terminal block.jpg' :
                    `/images/comp_siemens.png`;
                } else if (item.supplier === 'SCHNEIDER' && ['MCB', 'KONTAKTOR', 'RELAY', 'PFR RELAY', 'HMI', 'POWER SUPPLY', 'PUSH BUTTON', 'HANDLE SELECT SWITCH', 'EMERGENCY STOP', 'PILOT LIGHT', 'BUZZER', 'TERMINAL BLOCKS', 'STOPPER TERMINAL BLOCK', 'THERMAL OVERLOAD RELAY'].includes(item.category)) {
                  imgSrc = item.category === 'MCB' ? (item.name.includes('Auxiliary') || item.name.includes('iOF') ? '/images/61011_A9A26924_369.jpg' : item.name.includes('1 Phase') ? '/images/st.domf_1p_4.jpg' : '/images/153179629812045_372db456-10f1-45bd-b563-30b3ffeaa1db.png~tplv-aphluv4xwc-white-pad-v1_250_250.png') :
                    item.category === 'KONTAKTOR' ? (item.name.includes('Hitam') ? '/images/LC1D65AQ7_Image_369.jpg' : '/images/img389-1534317904.jpg') :
                    item.category === 'RELAY' ? '/images/RS_532_CPMFS18076C_369.jpg' :
                    item.category === 'PFR RELAY' ? '/images/mTefQBo.webp' :
                    item.category === 'HMI' ? '/images/R2007238-01.jpg' :
                    item.category === 'POWER SUPPLY' ? '/images/ABL7-8_CP19064_369.jpg' :
                    item.category === 'PUSH BUTTON' ? '/images/24f890c7-0979-4564-b84e-df64a6999ea3.jpg' :
                    item.category === 'HANDLE SELECT SWITCH' ? '/images/Selector-Switch--Handle-standar-warna-hitam-2-NO-3-stay-put-XB2BD33C.webp' :
                    item.category === 'EMERGENCY STOP' ? '/images/3fodpCjcFJtcSt4evaB1fro1HnCERSmSQLBQS4UA.webp' :
                    item.category === 'PILOT LIGHT' ? '/images/R8152171-01.webp' :
                    item.category === 'BUZZER' ? '/images/F1679011-02.webp' :
                    item.category === 'TERMINAL BLOCKS' ? '/images/PB502347_369.jpg' :
                    item.category === 'STOPPER TERMINAL BLOCK' ? '/images/NSYTRAAB35_DA19_369.jpg' :
                    item.category === 'THERMAL OVERLOAD RELAY' ? (item.name.includes('Putih') ? '/images/7fe4ec55f8cb72e75e46e4a405c75224.jpg' : '/images/LRD16_Image_AI-improved_2024_369.jpg') :
                    `/images/comp_schneider.png`;
                } else if (['HONEYWELL', 'CHINT', 'SIEMENS', 'SCHNEIDER'].includes(item.supplier)) {
                  imgSrc = `/images/comp_${item.supplier.toLowerCase()}.png`;
                } else if (item.supplier === 'WECON') {
                  imgSrc = item.category === 'HMI' ? "/images/images.jpg?v=2" : "/images/panel_kontrol_plc.png";
                }

                return (
                <article key={item.id || i} className="power-product-card glass-panel shadow-premium animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="product-illustration">
                    {imgSrc ? (
                      <img src={imgSrc} alt={item.name} width="64" height="64" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    ) : (
                      <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z" /></svg>
                    )}
                  </div>
                  <div className="product-cat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div className="product-tag" style={{ margin: 0 }}>{item.category}</div>
                    <span className={`brand-badge ${item.supplier === 'SCHNEIDER' ? 'schneider' : ''}`}>{item.supplier}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="product-price">Mulai <span>{formatRp(item.price)}</span></div>
                  <div className="product-actions">
                    <button className="btn-primary" onClick={() => openModal({
                      ...item,
                      cat: item.category,
                      brand: item.supplier,
                      images: imgSrc ? [imgSrc] : null,
                      components: 1 // for modal generic fallback
                    })}>
                      Lihat Detail
                    </button>
                  </div>
                </article>
              )})
            )}
          </div>
          {isFeatured && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/komponen" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
                Lihat Semua Komponen
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
