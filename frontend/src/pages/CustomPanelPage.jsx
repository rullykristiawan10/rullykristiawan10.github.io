import ProductGrid from '../components/ProductGrid';

export default function CustomPanelPage({ products, search, openModal }) {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      <ProductGrid products={products} search={search} openModal={openModal} />
    </div>
  );
}
