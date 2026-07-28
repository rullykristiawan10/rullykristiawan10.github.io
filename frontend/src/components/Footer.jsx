import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
              <div className="logo-icon">
                <img src="/images/Gemini_Generated_Image_l8zeeml8zeeml8ze-removebg-preview.png" alt="Logo Mitra Clima Pro" width="44" height="44" />
              </div>
              <div className="logo-text">
                <h3>MITRA CLIMA PRO</h3>
                <span>Panel &amp; Kontrol Motor</span>
              </div>
            </Link>
            <p>Distributor dan fabrikasi panel listrik terpercaya. Komponen original, garansi resmi, pengiriman seluruh Indonesia.</p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path d="M8 19H5V10h3v9zM6.5 8.7c-.9 0-1.5-.6-1.5-1.5S5.6 5.7 6.5 5.7 8 6.3 8 7.2c0 .9-.6 1.5-1.5 1.5z" fill="#fff" />
                  <path d="M19 19h-3v-4.5c0-1.1-.4-1.8-1.3-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V19h-3s.1-8 0-9h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z" fill="#fff" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Tokopedia">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M4 7h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" fill="#42b549" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#42b549" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="13" r="2.5" fill="#fff" />
                  <circle cx="15" cy="13" r="2.5" fill="#fff" />
                  <path d="M12 17l1.5-2h-3L12 17z" fill="#fff" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Shopee">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M4 7h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" fill="#ee4d2d" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#ee4d2d" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14.5 10.5 C 14.5 9 13 8.5 11.5 8.5 C 10 8.5 9 9 9 10 C 9 11 10 11.5 11 11.5 C 13 11.5 14 12 14 13.5 C 14 15 13 16 11.5 16 C 9.5 16 8.5 15 8 14 L 9.5 13 C 10 14 10.5 14.5 11.5 14.5 C 12.5 14.5 12.5 14 12.5 13.5 C 12.5 13 11.5 12.5 10.5 12.5 C 8.5 12.5 7.5 12 7.5 10 C 7.5 8.5 9 7 11.5 7 C 13.5 7 14.5 8 15 9 L 14.5 10.5 Z" fill="#fff" />
                </svg>
              </a>
              <a href="https://mitraclimaelectrindo.com/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Website">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </div>

          </div>
          <div className="footer-col">
            <h4>Produk</h4>
            <ul>
              <li><Link to="/custom-panel" onClick={() => window.scrollTo(0, 0)}>Motor Control Panel</Link></li>
              <li><Link to="/panel-power" onClick={() => window.scrollTo(0, 0)}>Panel Power</Link></li>
              <li><Link to="/panel-kontrol" onClick={() => window.scrollTo(0, 0)}>Panel Kontrol</Link></li>
              <li><Link to="/komponen" onClick={() => window.scrollTo(0, 0)}>Komponen</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Layanan</h4>
            <ul>
              <li><Link to="/layanan/konsultasi-teknis">Konsultasi Teknis</Link></li>
              <li><Link to="/layanan/instalasi">Instalasi & Komisioning</Link></li>
              <li><Link to="/layanan/servis">Servis & Maintenance</Link></li>
              <li><Link to="/layanan/pengiriman">Pengiriman Nasional</Link></li>
              <li><Link to="/layanan/garansi">Garansi Produk</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+6281933620432">+62 819-3362-0432</a>
              </li>
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:ptmitraclimaelectrindo@gmail.com" className="email-link">ptmitraclimaelectrindo@gmail.com</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <a href="https://maps.app.goo.gl/9XqvKNFQG8EjgWYq5" target="_blank" rel="noopener noreferrer">Karawang, Indonesia</a>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>Senin–Jumat 08:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Mitra Clima Pro. Hak Cipta Dilindungi.</span>
          <div className="footer-links">
            <span>Kebijakan Privasi</span>
            <span>Syarat & Ketentuan</span>
            <span>Peta Lokasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
