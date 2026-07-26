export default function Topbar() {
  return (
    <div className="topbar">
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', verticalAlign: 'middle' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
        Garansi komponen resmi <strong>1 tahun</strong>
      </span>
      <span>📞 Hubungi kami: <strong>+62 819-3362-0432</strong></span>
    </div>
  );
}
