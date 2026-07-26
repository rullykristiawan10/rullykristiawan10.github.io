import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import PanelPowerPage from './PanelPowerPage';
import PanelKontrolPage from './PanelKontrolPage';
import ComponentSection from '../components/ComponentSection';
import BlogSection from '../components/BlogSection';

export default function Home({ products, components, blogs, search, openModal }) {
  return (
    <>
      <Hero openModal={openModal} />
      <div style={{ padding: '20px 0', textAlign: 'center', background: '#F8FAFC' }}>
        <h2 style={{ fontSize: '28px', color: '#0B3D91', marginBottom: '8px' }}>Produk & Layanan Unggulan</h2>
        <p style={{ color: '#475569', maxWidth: '600px', margin: '0 auto' }}>Jelajahi koleksi panel dan komponen terbaik kami untuk kebutuhan industri Anda.</p>
      </div>
      <ProductGrid products={products} search={search} openModal={openModal} isFeatured={true} />
      <PanelPowerPage openModal={openModal} isFeatured={true} />
      <PanelKontrolPage openModal={openModal} isFeatured={true} />
      <ComponentSection components={components} search={search} openModal={openModal} isFeatured={true} />
      <BlogSection blogs={blogs} isFeatured={true} />
    </>
  );
}
