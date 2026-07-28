

const formatRp = (n) => 'Rp ' + (Number(n) || 0).toLocaleString('id-ID');

export default function CartModal({ isOpen, onClose, cartItems, onRemove }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    let message = "Halo Mitra Clima Pro, saya ingin memesan:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.qty || 1}x) - ${formatRp(item.price * (item.qty || 1))}\n`;
    });
    message += `\nTotal: ${formatRp(total)}\n\nMohon informasi ketersediaan stoknya. Terima kasih.`;
    
    window.open(`https://wa.me/6281933620432?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="modal-overlay show" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(10, 17, 40, 0.4)' }} onClick={(e) => { if (e.target.className.includes('modal-overlay')) onClose(); }}>
      <div className="modal show animate-pop-in shadow-premium" style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', borderRadius: 'var(--radius-lg)' }}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800 }}>🛒 Keranjang Penawaran</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '30px 0' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 10px', opacity: 0.5 }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Keranjang Anda masih kosong.</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.name}</div>
                  <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                    {formatRp(item.price)} <span style={{color: 'var(--muted)', fontSize: '12px'}}>x {item.qty || 1}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button 
                    onClick={() => onRemove(index)}
                    style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Hapus"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '18px', fontWeight: 800 }}>
              <span>Total Estimasi:</span>
              <span style={{ color: 'var(--accent)' }}>{formatRp(total)}</span>
            </div>
            <button className="btn-whatsapp" onClick={handleCheckout} style={{ width: '100%', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
