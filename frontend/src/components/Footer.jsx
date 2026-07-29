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
              <a href="https://www.instagram.com/ptmitraclimaelectrindo?utm_source=qr&igsh=ZTdic29tOG9wNXEz" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
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
