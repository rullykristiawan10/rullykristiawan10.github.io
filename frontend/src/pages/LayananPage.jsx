import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const layananData = {
  'konsultasi-teknis': {
    title: 'Konsultasi Teknis',
    desc: 'Kami menyediakan layanan konsultasi teknis yang komprehensif untuk membantu Anda menentukan solusi kelistrikan dan panel kontrol yang paling efisien dan tepat guna untuk kebutuhan industri Anda.',
    img: '/images/dist_angled.png'
  },
  'instalasi': {
    title: 'Instalasi & Komisioning',
    desc: 'Tim ahli kami siap memberikan layanan instalasi panel dan komisioning langsung di lokasi Anda untuk memastikan setiap sistem berfungsi dengan optimal, aman, dan sesuai standar.',
    img: '/images/motor_front.png'
  },
  'servis': {
    title: 'Servis & Maintenance',
    desc: 'Layanan purnajual berupa perbaikan (servis) dan perawatan (maintenance) rutin untuk menjaga performa panel listrik Anda tetap prima dan menghindari downtime produksi.',
    img: '/images/panel_inside.png'
  },
  'pengiriman': {
    title: 'Pengiriman Nasional',
    desc: 'Kami melayani pengiriman panel listrik dan komponen ke seluruh wilayah Indonesia dengan jaminan keamanan pengemasan dan ketepatan waktu.',
    img: '/images/panel_side.png'
  },
  'garansi': {
    title: 'Garansi Produk',
    desc: 'Setiap produk panel dan komponen resmi dari Mitra Clima Pro dilengkapi dengan garansi untuk memberikan ketenangan dan perlindungan investasi Anda.',
    img: '/images/dist_front.png'
  }
};

export default function LayananPage() {
  const { id } = useParams();
  const data = layananData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Layanan Tidak Ditemukan</h2>
          <p>Maaf, layanan yang Anda cari tidak tersedia.</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main" style={{ display: 'block', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="breadcrumb" style={{ padding: '20px 0', background: 'transparent', border: 'none' }}>
        <div className="breadcrumb-inner">
          <Link to="/">Beranda</Link>
          <span className="sep">/</span>
          <span>Layanan</span>
          <span className="sep">/</span>
          <span className="cur">{data.title}</span>
        </div>
      </div>
      
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--dark)' }}>{data.title}</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '30px' }}>
              {data.desc}
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '30px' }}>
              Silakan hubungi tim kami untuk informasi lebih lanjut mengenai layanan ini. Kami siap membantu Anda.
            </p>
            <a href={`https://wa.me/6281933620432?text=Halo%20Mitra%20Clima%20Pro,%20saya%20ingin%20bertanya%20tentang%20${encodeURIComponent(data.title)}.`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Hubungi via WhatsApp
            </a>
          </div>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '20px', display: 'flex', justifyContent: 'center', border: '1px solid var(--border)' }}>
            <img src={data.img} alt={data.title} style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
