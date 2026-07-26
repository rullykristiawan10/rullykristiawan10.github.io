import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount, onSearch, onCartClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="glass-nav">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <div className="logo-icon">
            <img src="/images/Gemini_Generated_Image_l8zeeml8zeeml8ze-removebg-preview.png" alt="Logo Mitra Clima Pro" width="44" height="44" />
          </div>
        </Link>
        
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Beranda</Link>
          <Link to="/custom-panel" onClick={closeMobileMenu}>Custom Panel</Link>
          <Link to="/panel-power" onClick={closeMobileMenu}>Panel Power</Link>
          <Link to="/panel-kontrol" onClick={closeMobileMenu}>Panel Kontrol</Link>
          <Link to="/komponen" onClick={closeMobileMenu}>Komponen</Link>
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          
          <div className="mobile-only-menu-actions" style={{ marginTop: '20px', flexDirection: 'column', gap: '10px', padding: '0 20px' }}>
            <a href="mailto:ptmitraclimaelectrindo@gmail.com?subject=Permintaan%20Penawaran%20Panel%20Listrik" className="btn-penawaran" style={{ display: 'flex', width: '100%', justifyContent: 'center' }} onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Email Kami
            </a>
            <a href="https://wa.me/6281933620432?text=Halo%20Mitra%20Clima%20Pro,%20saya%20ingin%20bertanya." target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ display: 'flex', width: '100%', justifyContent: 'center' }} onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hubungi WhatsApp
            </a>
          </div>
        </div>
        
        <div className="nav-right">
          <a href="https://wa.me/6281933620432?text=Halo%20Mitra%20Clima%20Pro,%20saya%20ingin%20bertanya." target="_blank" rel="noreferrer" className="nav-icon hidden-mobile" title="Kontak">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <a href="#" className="nav-icon badge" title="Penawaran" style={{position:'relative'}} onClick={(e) => { e.preventDefault(); onCartClick(); closeMobileMenu(); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="badge-dot">{cartCount}</span>
          </a>
          <a href="mailto:ptmitraclimaelectrindo@gmail.com?subject=Permintaan%20Penawaran%20Panel%20Listrik" className="btn-penawaran hidden-mobile">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Minta Penawaran
          </a>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
