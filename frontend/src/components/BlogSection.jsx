import { Link } from 'react-router-dom';

export default function BlogSection({ blogs = [], isFeatured }) {
  const displayBlogs = isFeatured ? blogs.slice(0, 4) : blogs;

  return (
    <section id="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <span className="label">📚 ARTIKEL & TIPS</span>
          <h2>Panduan & Tips Perawatan Panel Listrik</h2>
          <p>Dapatkan informasi terbaru tentang instalasi, maintenance, dan best practices untuk panel kontrol motor Anda.</p>
        </div>
        <div className="blog-grid">
          {displayBlogs.length === 0 ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--muted)'}}>
              Belum ada artikel blog.
            </div>
          ) : (
            displayBlogs.map(blog => (
              <div className="blog-card" key={blog.id}>
                <div className="blog-card-img" style={{ background: 'none' }}>
                  <img src={blog.img_src || "/images/blog_motor_maintenance.png"} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {blog.tag && <span className="blog-card-tag">{blog.tag.toUpperCase()}</span>}
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <div className="blog-card-meta">
                    <div className="author">👤 {blog.author || 'Admin'}</div>
                    <div className="date">📅 {blog.date}</div>
                  </div>
                  <Link to={`/blog/${blog.slug}`} className="blog-card-readmore">Baca Selengkapnya →</Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        {isFeatured && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/blog" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
              Lihat Semua Artikel
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
