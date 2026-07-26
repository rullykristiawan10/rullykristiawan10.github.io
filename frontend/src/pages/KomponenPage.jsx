import ComponentSection from '../components/ComponentSection';

export default function KomponenPage({ components, search, openModal }) {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
      <ComponentSection components={components} search={search} openModal={openModal} />
    </div>
  );
}
