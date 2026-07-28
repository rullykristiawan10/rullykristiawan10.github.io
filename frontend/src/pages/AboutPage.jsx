import ContactSection from '../components/ContactSection';

export default function AboutPage() {
  return (
    <>
      <div className="page-header" style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%)', color: 'white' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '15px' }}>Tentang Kami</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', opacity: 0.9 }}>
          Mengenal lebih dekat Mitra Clima Pro, mitra terpercaya Anda dalam solusi panel listrik dan komponen kelistrikan industri.
        </p>
      </div>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '20px' }}>PT. Mitra Clima Electrindo</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              PT. Mitra Clima Electrindo adalah perusahaan yang bergerak di bidang electrical contractor dan instalasi listrik yang berpengalaman dan terpercaya di Indonesia. Berdiri dengan komitmen untuk memberikan solusi kelistrikan terbaik, kami telah melayani berbagai sektor industri, komersial, dan perumahan di seluruh Indonesia.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              Bidang usaha kami meliputi electrical contractor, instalasi listrik industri, instalasi listrik komersial, instalasi listrik perumahan, maintenance sistem kelistrikan, instalasi panel listrik dan switchboard, grounding system, serta lightning protection system.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              Dengan tenaga ahli bersertifikat dan berpengalaman, PT. Mitra Clima Electrindo berkomitmen untuk menghadirkan pekerjaan kelistrikan yang aman, berkualitas tinggi, dan sesuai dengan standar nasional maupun internasional. Kepuasan klien dan keselamatan kerja menjadi prioritas utama dalam setiap proyek yang kami kerjakan.
            </p>

            <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '25px', marginBottom: '10px' }}>Visi dan Misi Perusahaan</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              PT. Mitra Clima Electrindo berkomitmen untuk menjadi perusahaan kontraktor listrik terdepan yang mengutamakan kualitas, keamanan, dan inovasi dalam setiap proyek yang dikerjakan.
            </p>
            
            <h4 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '5px', fontWeight: 700 }}>Visi:</h4>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
              Menjadi perusahaan electrical contractor dan instalasi listrik terpercaya, profesional, dan terdepan di Indonesia yang menghadirkan solusi kelistrikan berkualitas tinggi dengan standar keamanan internasional.
            </p>
            
            <h4 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '5px', fontWeight: 700 }}>Misi:</h4>
            <ul style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', margin: 0, paddingLeft: '20px', marginBottom: '25px' }}>
              <li style={{ marginBottom: '8px' }}>Memberikan layanan instalasi listrik yang aman, handal, dan berkualitas tinggi kepada setiap klien.</li>
              <li style={{ marginBottom: '8px' }}>Mengembangkan sumber daya manusia yang kompeten dan bersertifikat di bidang kelistrikan.</li>
              <li>Menerapkan teknologi terkini dan inovasi dalam setiap proyek instalasi listrik untuk hasil yang optimal dan berkelanjutan.</li>
            </ul>

            <a href="/profil-perusahaan.pdf" download className="btn-primary" style={{ display: 'inline-flex', marginTop: '10px' }}>
              Download Profil Perusahaan
            </a>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src="/images/panel_front.png" alt="Pembuatan Panel Listrik" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>

        <div style={{ marginTop: '80px', display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🛡️</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Kualitas Terjamin</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Semua produk kami menggunakan komponen asli berkualitas dan bergaransi resmi.</p>
          </div>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚙️</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Tenaga Ahli</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Dikerjakan oleh teknisi profesional bersertifikat dengan standar perakitan tinggi.</p>
          </div>
          <div style={{ padding: '30px', background: 'var(--bg-alt)', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚚</div>
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Pengiriman Nasional</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Melayani pengiriman dan instalasi ke berbagai wilayah industri di seluruh Indonesia.</p>
          </div>
        </div>
      </div>
      
      <ContactSection />
    </>
  );
}
