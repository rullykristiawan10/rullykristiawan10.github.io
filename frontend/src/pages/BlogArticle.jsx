import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
export default function BlogArticle({ blogs = [] }) {
  const { slug } = useParams();
  
  // Find the blog that matches the slug
  const blog = blogs.find(b => b.slug === slug);

  // Scroll to top when article is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
        <Helmet>
          <title>Artikel Tidak Ditemukan - Mitra Clima Pro</title>
        </Helmet>
        <h2>Artikel Tidak Ditemukan</h2>
        <p>Maaf, artikel yang Anda cari tidak tersedia.</p>
        <Link to="/blog" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#fff' }}>
      <Helmet>
        <title>{blog.title} - Mitra Clima Pro</title>
        <meta name="description" content={blog.excerpt} />
        {blog.tag && <meta name="keywords" content={blog.tag} />}
        
        {/* Open Graph / Social Media (WhatsApp, Facebook, LinkedIn) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        {blog.img_src && <meta property="og:image" content={typeof window !== 'undefined' ? window.location.origin + blog.img_src : ''} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        {blog.img_src && <meta name="twitter:image" content={typeof window !== 'undefined' ? window.location.origin + blog.img_src : ''} />}
      </Helmet>
      
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <Link to="/blog" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Kembali ke Blog
        </Link>
        
        {blog.tag && (
          <div style={{ marginBottom: '16px' }}>
            <span style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: 700 }}>
              {blog.tag.toUpperCase()}
            </span>
          </div>
        )}
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', marginBottom: '16px', lineHeight: 1.2 }}>
          {blog.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--muted)', fontSize: '15px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>👤</span> {blog.author || 'Admin'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📅</span> {blog.date}
          </div>
        </div>
        
        {blog.img_src && (
          <div style={{ marginBottom: '40px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
            <img src={blog.img_src} alt={blog.title} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '450px', objectFit: 'cover' }} />
          </div>
        )}
        
        {/* The content is now rendered with ReactMarkdown */}
        <div 
          className="blog-content" 
          style={{ fontSize: '18px', lineHeight: 1.8, color: '#374151' }}
        >
          <ReactMarkdown>{blog.content || ''}</ReactMarkdown>
        </div>
        
      </article>
    </div>
  );
}
