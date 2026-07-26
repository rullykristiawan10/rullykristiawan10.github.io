import { useState, useEffect } from 'react';
import powerPanelImg from '../assets/power_panel_3d.png';
import controlPanelImg from '../assets/control_panel_3d.png';
import componentsImg from '../assets/components_3d.png';

export default function Hero({ openModal }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const heroProducts = [
    {
      img: powerPanelImg,
      title: "Panel Distribusi Utama",
      desc: "Distribusi daya industri dengan standar keamanan tinggi."
    },
    {
      img: controlPanelImg,
      title: "Panel Kontrol Motor",
      desc: "Otomatisasi & perlindungan motor terbaik di kelasnya."
    },
    {
      img: componentsImg,
      title: "Komponen Elektrikal",
      desc: "Suku cadang orisinal & bergaransi resmi."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text animate-fade-in-up">
          <div className="hero-badge">⚡ Distributor Resmi Panel Listrik</div>
          <h1>Panel Kontrol Motor<br/><span>Siap Pasang</span> Terpercaya</h1>
          <p>Solusi panel listrik lengkap untuk industri Anda. Komponen original, rakitan profesional, pengiriman ke seluruh Indonesia.</p>
          <div className="hero-btns" style={{ position: 'relative', zIndex: 10 }}>
            <a href="#custom-panel" onClick={(e) => { 
              e.preventDefault(); 
              const el = document.getElementById('custom-panel');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }} className="btn-primary shadow-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Cari Custom Panel
            </a>
          </div>
          <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-stat"><div className="num">500+</div><div className="lbl">Produk Panel</div></div>
            <div className="hero-stat"><div className="num">1200+</div><div className="lbl">Klien Puas</div></div>
            <div className="hero-stat"><div className="num">34</div><div className="lbl">Provinsi</div></div>
            <div className="hero-stat"><div className="num">10 Th</div><div className="lbl">Pengalaman</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="animate-float" style={{ animationDelay: '0.4s', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px', aspectRatio: '1 / 1', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
              {heroProducts.map((prod, idx) => (
                <img 
                  key={idx}
                  src={prod.img} 
                  alt={prod.title} 
                  width="360"
                  height="360"
                  className={`hero-main-img hero-carousel-img ${activeIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center', minHeight: '60px' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', marginBottom: '6px', letterSpacing: '0.5px' }}>{heroProducts[activeIndex].title}</h3>
              <p style={{ color: '#cfe0f7', fontSize: '13.5px', margin: 0, maxWidth: '280px' }}>{heroProducts[activeIndex].desc}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {heroProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    width: activeIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeIndex === idx ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: 0
                  }}
                />
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
