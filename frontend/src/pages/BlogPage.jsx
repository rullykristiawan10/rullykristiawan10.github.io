import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogSection from '../components/BlogSection';

export default function BlogPage({ blogs = [] }) {
  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
      <Helmet>
        <title>Blog & Artikel Teknis - Mitra Clima Pro</title>
        <meta name="description" content="Kumpulan artikel, tips perawatan, dan panduan instalasi panel listrik kontrol motor industri dari Mitra Clima Pro." />
      </Helmet>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}>Arsip Blog</h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Temukan berbagai panduan teknis dan artikel terbaru seputar industri panel kontrol dan distribusi listrik.
          </p>
        </div>
        
        <BlogSection blogs={blogs} isFeatured={false} />
      </div>
    </div>
  );
}
