import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminWhatsApp from './AdminWhatsApp';

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');

const renderAggregateStock = (item) => {
  let parsedParts = [];
  if (typeof item.parts === 'string') {
    try { parsedParts = JSON.parse(item.parts); } catch(e) {}
  } else if (Array.isArray(item.parts)) {
    parsedParts = item.parts;
  }
  
  if (!parsedParts || parsedParts.length === 0) {
    let s = item.stock;
    if (!isNaN(s) && String(s).trim() !== '') s = Number(s);
    if (typeof s === 'number') {
      return s > 0 ? <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{s} pcs</span> : <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Kosong (0 pcs)</span>;
    }
    if (String(s).toLowerCase().trim() === 'kosong') return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Kosong</span>;
    return <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Ready</span>;
  }
  
  let totalNumeric = 0;
  let hasReady = false;
  let hasKosong = false;
  let hasNumeric = false;
  
  parsedParts.forEach(p => {
    if (typeof p.stock === 'number') {
      totalNumeric += p.stock;
      hasNumeric = true;
    } else if (String(p.stock || 'ready').toLowerCase().trim() === 'ready') {
      hasReady = true;
    } else if (String(p.stock).toLowerCase().trim() === 'kosong') {
      hasKosong = true;
    }
  });
  
  if (hasReady && hasNumeric) {
    return <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Ready ({totalNumeric}+ pcs)</span>;
  }
  if (hasReady) {
    return <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Ready</span>;
  }
  if (hasNumeric) {
    if (totalNumeric > 0) {
      return <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{totalNumeric} pcs</span>;
    } else {
      return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Kosong (0 pcs)</span>;
    }
  }
  if (hasKosong) {
    return <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Kosong</span>;
  }
  return <span style={{ color: 'var(--muted)' }}>-</span>;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ products: [], components: [], blogs: [], messages: [], portfolios: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Search & Pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({});
  const [toastMsg, setToastMsg] = useState('');
  
  const navigate = useNavigate();

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Verify token & load data
    const init = async () => {
      try {
        const verifyRes = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!verifyRes.ok) throw new Error('Token invalid');
        const verifyData = await verifyRes.json();
        setUser(verifyData.user);

        fetchData();
      } catch (err) {
        console.error(err);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    init();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const pRes = await fetch('/api/products');
      const cRes = await fetch('/api/components');
      const bRes = await fetch('/api/blogs');
      const poRes = await fetch('/api/portfolios');
      const mRes = await fetch('/api/messages', { headers: { 'Authorization': `Bearer ${token}` } });
      const products = await pRes.json();
      const components = await cRes.json();
      const blogs = bRes.ok ? await bRes.json() : [];
      const portfolios = poRes.ok ? await poRes.json() : [];
      const messages = mRes.ok ? await mRes.json() : [];
      setData({ products, components, blogs, portfolios, messages });
    } catch (err) {
      showToast('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    if (item) {
      const parsedItem = { ...item };
      if (typeof parsedItem.features === 'string') {
        try { parsedItem.features = JSON.parse(parsedItem.features); } catch(e) { parsedItem.features = []; }
      }
      if (typeof parsedItem.parts === 'string') {
        try { parsedItem.parts = JSON.parse(parsedItem.parts); } catch(e) { parsedItem.parts = []; }
      }
      if (mode === 'add') {
        delete parsedItem.id; // Remove ID for duplication
      }
      setFormData(parsedItem);
    } else {
      setFormData({ features: [], parts: [] });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Yakin ingin menghapus ${type === 'products' ? 'produk' : 'komponen'} ini?`)) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Data berhasil dihapus');
        fetchData();
      } else {
        showToast('Gagal menghapus data');
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const endpoint = `/api/${activeTab}`;
    const url = modalMode === 'add' ? endpoint : `${endpoint}/${formData.id}`;
    const method = modalMode === 'add' ? 'POST' : 'PUT';

    // Parsing complex fields for products
    const submitData = { ...formData };
    if (typeof submitData.parts === 'string') {
      try { submitData.parts = JSON.parse(submitData.parts); } catch(e) { submitData.parts = []; }
    }

    if (activeTab === 'products') {
      submitData.price = Number(submitData.price || 0);
      submitData.power = Number(submitData.power || 0);
      submitData.kw = Number(submitData.kw || 0);
      submitData.components = Number(submitData.components || 0);
      if (Array.isArray(submitData.features)) {
        submitData.features = submitData.features.filter(f => typeof f === 'string' && f.trim() !== '');
      } else if (typeof submitData.features === 'string') {
        try { submitData.features = JSON.parse(submitData.features); } catch(e) { submitData.features = []; }
      }
    } else {
      submitData.price = Number(submitData.price || 0);
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });
      if (res.ok) {
        showToast(`Data berhasil di${modalMode === 'add' ? 'tambahkan' : 'perbarui'}`);
        setIsModalOpen(false);
        fetchData();
      } else {
        showToast('Gagal menyimpan data');
      }
    } catch (err) {
      showToast('Terjadi kesalahan sistem');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate slug from title for blogs
      if (name === 'title' && activeTab === 'blogs') {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      
      return newData;
    });
  };

  const insertFormatting = (prefix, suffix) => {
    const textarea = document.getElementById('blog-content-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = formData.content || '';
    const selectedText = currentContent.substring(start, end);
    const newContent = currentContent.substring(0, start) + prefix + selectedText + suffix + currentContent.substring(end);
    
    setFormData(prev => ({...prev, content: newContent}));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleImageUpload = async (e, fieldName = 'img_src') => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => {
          if (fieldName === 'images') {
            return { ...prev, images: [data.url] };
          }
          return { ...prev, [fieldName]: data.url };
        });
        showToast('Gambar berhasil diupload');
      } else {
        showToast('Gagal mengupload gambar');
      }
    } catch (err) {
      showToast('Terjadi kesalahan saat mengupload gambar');
    }
  };

  const handlePartChange = (index, field, value) => {
    setFormData(prev => {
      const parts = Array.isArray(prev.parts) ? [...prev.parts] : [];
      if (typeof parts[index] !== 'object') parts[index] = {};
      if (field === 'qty') {
        const currentQty = parts[index].qty !== undefined ? parseInt(parts[index].qty) : 1;
        const actualOldQty = isNaN(currentQty) ? 1 : currentQty;
        const newQty = parseInt(value) || 0;
        const diff = newQty - actualOldQty;
        
        if (typeof parts[index].stock === 'number') {
          parts[index].stock = Math.max(0, parts[index].stock - diff);
        } else if (!isNaN(parts[index].stock) && String(parts[index].stock).trim() !== '') {
          parts[index].stock = Math.max(0, Number(parts[index].stock) - diff);
        }
      }

      parts[index][field] = value;
      
      if (activeTab === 'products') {
        const totalPrice = parts.reduce((sum, p) => sum + ((parseInt(p.qty) || 0) * (Number(p.price) || 0)), 0);
        return { ...prev, parts, price: parts.length > 0 && totalPrice > 0 ? totalPrice : prev.price };
      }
      return { ...prev, parts };
    });
  };

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...(Array.isArray(prev.parts) ? prev.parts : []), { name: '', qty: 1, price: '', notes: '' }]
    }));
  };

  const removePart = (index) => {
    setFormData(prev => {
      const parts = Array.isArray(prev.parts) ? [...prev.parts] : [];
      parts.splice(index, 1);
      
      if (activeTab === 'products') {
        const totalPrice = parts.reduce((sum, p) => sum + ((parseInt(p.qty) || 0) * (Number(p.price) || 0)), 0);
        return { ...prev, parts, price: parts.length > 0 ? totalPrice : prev.price };
      }
      return { ...prev, parts };
    });
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => {
      const features = Array.isArray(prev.features) ? [...prev.features] : [];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(Array.isArray(prev.features) ? prev.features : []), '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => {
      const features = Array.isArray(prev.features) ? [...prev.features] : [];
      features.splice(index, 1);
      return { ...prev, features };
    });
  };

  if (loading && !user) return <div style={{padding: '50px', textAlign: 'center'}}>Memuat Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar shadow-premium">
        <div className="admin-brand">
          <h3>Mitra Clima Pro</h3>
          <span className="admin-badge">Admin Panel</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            📊 Ringkasan
          </button>
          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            📦 Kelola Panel
          </button>
          <button className={`admin-nav-item ${activeTab === 'components' ? 'active' : ''}`} onClick={() => setActiveTab('components')}>
            ⚙️ Kelola Komponen
          </button>
          <button className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            📝 Kelola Blog
          </button>
          <button className={`admin-nav-item ${activeTab === 'portfolios' ? 'active' : ''}`} onClick={() => setActiveTab('portfolios')}>
            🏆 Kelola Portofolio
          </button>
          <button className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            ✉️ Pesan Masuk
          </button>
          <button className={`admin-nav-item ${activeTab === 'whatsapp' ? 'active' : ''}`} onClick={() => setActiveTab('whatsapp')}>
            🤖 WhatsApp Bot
          </button>
          <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            ⚙️ Pengaturan
          </button>
        </nav>
        <div className="admin-user">
          <div>Halo, <strong>{user?.username}</strong></div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {activeTab === 'overview' ? 'Ringkasan Dashboard' : 
             activeTab === 'products' ? 'Kelola Katalog Produk' : 
             activeTab === 'components' ? 'Kelola Katalog Komponen' : 
             activeTab === 'blogs' ? 'Kelola Blog' : 
             activeTab === 'portfolios' ? 'Kelola Portofolio' : 
             activeTab === 'messages' ? 'Pesan Masuk' : 
             activeTab === 'whatsapp' ? 'WhatsApp Bot' :
             'Pengaturan Akun'}
          </h2>
          {['products', 'components', 'blogs', 'portfolios'].includes(activeTab) && (
            <button className="btn-admin-primary" onClick={() => handleOpenModal('add')}>
              + Tambah {activeTab === 'products' ? 'Produk' : activeTab === 'components' ? 'Komponen' : activeTab === 'blogs' ? 'Blog' : 'Portofolio'}
            </button>
          )}
        </header>

        {/* Search Bar */}
        {['products', 'components', 'blogs', 'portfolios', 'messages'].includes(activeTab) && (
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <input 
              type="text" 
              placeholder="Cari data..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', width: '300px', fontSize: '14px', outline: 'none' }}
            />
          </div>
        )}

        <div className="admin-table-container shadow-premium">
          {loading ? (
            <div style={{padding: '40px', textAlign: 'center'}}>Memuat data...</div>
          ) : (
            <>
            {activeTab === 'overview' && (
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ padding: '24px', background: '#e0f2fe', borderRadius: '12px', borderLeft: '4px solid #0284c7' }}>
                  <h3 style={{ margin: 0, color: '#0369a1', fontSize: '14px', textTransform: 'uppercase' }}>Total Produk Panel</h3>
                  <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 800 }}>{data.products.length}</p>
                </div>
                <div style={{ padding: '24px', background: '#dcfce7', borderRadius: '12px', borderLeft: '4px solid #16a34a' }}>
                  <h3 style={{ margin: 0, color: '#15803d', fontSize: '14px', textTransform: 'uppercase' }}>Total Komponen</h3>
                  <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 800 }}>{data.components.length}</p>
                </div>
                <div style={{ padding: '24px', background: '#fef3c7', borderRadius: '12px', borderLeft: '4px solid #d97706' }}>
                  <h3 style={{ margin: 0, color: '#b45309', fontSize: '14px', textTransform: 'uppercase' }}>Total Blog Artikel</h3>
                  <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 800 }}>{data.blogs.length}</p>
                </div>
                <div className="padding-box" style={{ padding: '24px', background: '#fef3c7', borderRadius: '12px', borderLeft: '4px solid #d97706' }}>
                  <h3 style={{ margin: 0, color: '#b45309', fontSize: '14px', textTransform: 'uppercase' }}>Total Portofolio</h3>
                  <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 800 }}>{data.portfolios.length}</p>
                </div>
                <div style={{ padding: '24px', background: '#fee2e2', borderRadius: '12px', borderLeft: '4px solid #dc2626' }}>
                  <h3 style={{ margin: 0, color: '#b91c1c', fontSize: '14px', textTransform: 'uppercase' }}>Pesan Baru</h3>
                  <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 800 }}>{data.messages.filter(m => m.status === 'unread').length}</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{ padding: '30px', maxWidth: '500px' }}>
                <h3 style={{ marginBottom: '20px' }}>Ubah Password Admin</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem('adminToken');
                  const currentPassword = e.target.currentPassword.value;
                  const newPassword = e.target.newPassword.value;
                  const confirmPassword = e.target.confirmPassword.value;
                  if (newPassword !== confirmPassword) {
                    showToast('Password baru dan konfirmasi tidak cocok');
                    return;
                  }
                  try {
                    const res = await fetch('/api/admin/password', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                      body: JSON.stringify({ currentPassword, newPassword })
                    });
                    const result = await res.json();
                    if (res.ok) {
                      showToast('Password berhasil diubah!');
                      e.target.reset();
                    } else {
                      showToast(result.error || 'Gagal mengubah password');
                    }
                  } catch (err) {
                    showToast('Terjadi kesalahan server');
                  }
                }}>
                  <div className="form-group">
                    <label>Password Saat Ini</label>
                    <input type="password" name="currentPassword" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                  </div>
                  <div className="form-group">
                    <label>Password Baru</label>
                    <input type="password" name="newPassword" required minLength="6" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                  </div>
                  <div className="form-group">
                    <label>Konfirmasi Password Baru</label>
                    <input type="password" name="confirmPassword" required minLength="6" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                  </div>
                  <button type="submit" className="btn-admin-primary" style={{ marginTop: '10px', width: '100%' }}>Simpan Password Baru</button>
                </form>
              </div>
            )}
            
            {activeTab === 'whatsapp' && (
              <AdminWhatsApp />
            )}

            {['products', 'components', 'blogs', 'messages'].includes(activeTab) && (() => {
              // Filtering
              let list = activeTab === 'products' ? data.products : 
                         activeTab === 'components' ? data.components : 
                         activeTab === 'portfolios' ? data.portfolios :
                         activeTab === 'messages' ? data.messages : data.blogs;
              
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                list = list.filter(item => 
                  (item.name || item.title || item.name || '').toLowerCase().includes(q) || 
                  (item.cat || item.category || item.tag || '').toLowerCase().includes(q) ||
                  (item.brand || item.supplier || item.email || '').toLowerCase().includes(q)
                );
              }

              // Sorting for products/components
              if (activeTab === 'products' || activeTab === 'components') {
                list = list.sort((a, b) => {
                  const brandA = (a.brand || a.supplier || '').toLowerCase();
                  const brandB = (b.brand || b.supplier || '').toLowerCase();
                  if (brandA < brandB) return -1;
                  if (brandA > brandB) return 1;
                  const catA = (a.cat || a.category || '').toLowerCase();
                  const catB = (b.cat || b.category || '').toLowerCase();
                  if (catA < catB) return -1;
                  if (catA > catB) return 1;
                  return 0;
                });
              }

              // Pagination
              const totalPages = Math.ceil(list.length / itemsPerPage) || 1;
              const paginatedList = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

              return (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      {activeTab === 'products' && <tr><th>ID</th><th>Nama Produk</th><th>Kategori</th><th>Brand</th><th>Harga</th><th style={{textAlign: 'center'}}>Stok</th><th>Aksi</th></tr>}
                      {activeTab === 'components' && <tr><th>ID</th><th>Nama Komponen</th><th>Kategori</th><th>Supplier</th><th>Harga</th><th style={{textAlign: 'center'}}>Stok</th><th>Aksi</th></tr>}
                      {activeTab === 'blogs' && <tr><th>ID</th><th>Gambar</th><th>Judul Artikel</th><th>Slug (URL)</th><th>Tanggal</th><th style={{ textAlign: 'right' }}>Aksi</th></tr>}
                      {activeTab === 'portfolios' && <tr><th>ID</th><th>Gambar</th><th>Judul Proyek</th><th>Klien</th><th>Tahun</th><th>Tag</th><th style={{ textAlign: 'right' }}>Aksi</th></tr>}
                      {activeTab === 'messages' && <tr><th>Tanggal</th><th>Nama</th><th>Email / WA</th><th>Pesan</th><th>Status</th><th style={{ textAlign: 'right' }}>Aksi</th></tr>}
                    </thead>
                    <tbody>
                      {paginatedList.map(item => (
                        <tr key={item.id} style={activeTab === 'messages' && item.status === 'unread' ? { backgroundColor: '#f0f9ff', fontWeight: 600 } : {}}>
                          {activeTab === 'messages' ? (
                            <>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td>{item.name}</td>
                              <td>{item.email} <br/><span style={{fontSize:'12px', color:'var(--muted)'}}>{item.phone}</span></td>
                              <td><div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.message}>{item.message}</div></td>
                              <td>
                                {item.status === 'unread' ? <span style={{background:'#fee2e2', color:'#dc2626', padding:'4px 8px', borderRadius:'4px', fontSize:'11px'}}>Baru</span> : <span style={{background:'#dcfce7', color:'#16a34a', padding:'4px 8px', borderRadius:'4px', fontSize:'11px'}}>Dibaca</span>}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {item.status === 'unread' && (
                                  <button className="btn-edit" onClick={async () => {
                                    const res = await fetch(`/api/messages/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }, body: JSON.stringify({ status: 'read' }) });
                                    if (res.ok) fetchData();
                                  }}>Tandai Dibaca</button>
                                )}
                                <button className="btn-delete" onClick={() => handleDelete(item.id, 'messages')} style={{marginLeft:'8px'}}>Hapus</button>
                              </td>
                            </>
                          ) : activeTab === 'blogs' ? (
                            <>
                              <td>{item.id}</td>
                              <td><img src={item.img_src} alt={item.title} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'4px'}} /></td>
                              <td style={{ fontWeight: 600 }}>{item.title}</td>
                              <td><span style={{background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px', fontSize:'12px'}}>{item.slug}</span></td>
                              <td>{item.date}</td>
                              <td style={{ textAlign: 'right' }}>
                                <button className="btn-edit" onClick={() => handleOpenModal('edit', item)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(item.id, 'blogs')} style={{marginLeft:'8px'}}>Hapus</button>
                              </td>
                            </>
                          ) : activeTab === 'portfolios' ? (
                            <>
                              <td>{item.id}</td>
                              <td><img src={item.img_src} alt={item.title} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'4px'}} /></td>
                              <td style={{ fontWeight: 600 }}>{item.title}</td>
                              <td>{item.client}</td>
                              <td>{item.year}</td>
                              <td><span className="badge2">{item.tag}</span></td>
                              <td style={{ textAlign: 'right' }}>
                                <button className="btn-edit" onClick={() => handleOpenModal('edit', item)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(item.id, 'portfolios')} style={{marginLeft:'8px'}}>Hapus</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{item.id}</td>
                              <td style={{fontWeight: 600}}>{item.name}</td>
                              <td>{item.cat || item.category}</td>
                              <td>{item.brand || item.supplier}</td>
                              <td className="admin-price">{formatRp(item.price)}</td>
                              <td style={{textAlign: 'center'}}>{renderAggregateStock(item)}</td>
                              <td>
                                <div className="admin-actions">
                                  <button className="btn-edit" onClick={() => handleOpenModal('edit', item)}>Edit</button>
                                  <button className="btn-edit" style={{background: '#f59e0b', color: '#fff', borderColor: '#f59e0b'}} onClick={() => handleOpenModal('add', item)}>Duplikat</button>
                                  <button className="btn-delete" onClick={() => handleDelete(item.id, activeTab)}>Hapus</button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                      {paginatedList.length === 0 && (
                        <tr><td colSpan="7" style={{textAlign:'center', padding:'30px', color:'var(--muted)'}}>Data tidak ditemukan.</td></tr>
                      )}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', gap: '10px', borderTop: '1px solid var(--border)' }}>
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                        disabled={currentPage === 1}
                        style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: currentPage === 1 ? '#f1f5f9' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                      >
                        Prev
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Halaman {currentPage} dari {totalPages}</span>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                        disabled={currentPage === totalPages}
                        style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: currentPage === totalPages ? '#f1f5f9' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
            </>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay show" style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <div className="modal show animate-pop-in admin-modal shadow-premium" style={{ maxWidth: (activeTab === 'blogs' || activeTab === 'portfolios') ? '1350px' : '1200px' }}>
            <div className="modal-header">
              <h2>{modalMode === 'add' ? 'Tambah' : 'Edit'} {activeTab === 'products' ? 'Produk' : activeTab === 'components' ? 'Komponen' : activeTab === 'blogs' ? 'Blog' : 'Portofolio'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display: 'block' }}>
              <form id="adminForm" onSubmit={handleSubmit} className={`admin-form ${(activeTab !== 'blogs' && activeTab !== 'portfolios') ? 'admin-form-grid' : ''}`} style={(activeTab === 'blogs' || activeTab === 'portfolios') ? { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start', width: '100%' } : {}}>
                
                {/* LEFT COLUMN: Details */}
                <div className={(activeTab !== 'blogs' && activeTab !== 'portfolios') ? 'form-left-col' : ''} style={(activeTab === 'blogs' || activeTab === 'portfolios') ? { width: '100%' } : {}}>
                  {activeTab === 'products' ? (
                    <>
                      <div className="form-group">
                        <label>Nama Produk *</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kategori (cat)</label>
                          <input type="text" name="cat" value={formData.cat || ''} onChange={handleChange} placeholder="PANEL MOTOR" />
                        </div>
                        <div className="form-group">
                          <label>Tipe (type)</label>
                          <input type="text" name="type" value={formData.type || ''} onChange={handleChange} placeholder="motor" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Brand</label>
                          <input type="text" name="brand" value={formData.brand || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label>Metode Start (method)</label>
                          <input type="text" name="method" value={formData.method || ''} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Daya (kw)</label>
                          <input type="number" step="0.1" name="kw" value={formData.kw || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label>Phase</label>
                          <input type="text" name="phase" value={formData.phase || ''} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Harga (Rp) *</label>
                          <input type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label>Jumlah Komponen</label>
                          <input type="number" name="components" value={formData.components || ''} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Stok Utama</label>
                        <input type="text" name="stock" value={formData.stock || ''} onChange={handleChange} placeholder="Ready, Kosong, atau angka (contoh: 10)" />
                      </div>
                      
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label style={{ margin: 0 }}>Fitur Utama</label>
                          <button type="button" onClick={addFeature} className="btn-edit" style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '6px' }}>+ Tambah Fitur</button>
                        </div>
                        {(Array.isArray(formData.features) ? formData.features : []).map((feat, index) => (
                          <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              type="text" 
                              value={feat} 
                              onChange={(e) => handleFeatureChange(index, e.target.value)} 
                              placeholder="Masukkan fitur..." 
                              style={{ flex: 1, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} 
                            />
                            <button type="button" onClick={() => removeFeature(index)} className="btn-delete" style={{ padding: '0 12px', borderRadius: '6px' }}>✕</button>
                          </div>
                        ))}
                        {(!formData.features || formData.features.length === 0) && (
                          <div style={{ color: 'var(--muted)', fontSize: '13px', fontStyle: 'italic', padding: '12px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '6px' }}>
                            Belum ada fitur. Klik + Tambah Fitur untuk menambahkan.
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === 'components' ? (
                    <>
                      <div className="form-group">
                        <label>Nama Komponen *</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kategori</label>
                          <input type="text" name="category" value={formData.category || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label>Supplier</label>
                          <input type="text" name="supplier" value={formData.supplier || ''} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Tag</label>
                        <input type="text" name="tag" value={formData.tag || ''} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Deskripsi</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3"></textarea>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Harga (Rp) *</label>
                          <input type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <label>Stok Utama</label>
                          <input type="text" name="stock" value={formData.stock || ''} onChange={handleChange} placeholder="Ready, Kosong, atau angka" />
                        </div>
                      </div>
                      <div className="form-group" style={{ margin: 0, padding: '20px', background: '#f8fafc', border: '1px dashed var(--border)', borderRadius: '12px', marginTop: '8px' }}>
                        <label style={{ marginBottom: '16px' }}>Gambar Komponen</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          {(formData.images && formData.images.length > 0) && (
                            <img src={formData.images[0]} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <label className="btn-edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 18px', borderRadius: '8px', background: '#e0f2fe', color: '#0ea5e9', fontWeight: 600 }}>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'images')} style={{ display: 'none' }} />
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                              Pilih Gambar Baru
                            </label>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>Format disarankan: JPG, PNG, WEBP. Maksimal ukuran file 2MB.</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : activeTab === 'portfolios' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label>Judul Proyek *</label>
                        <input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Contoh: Main Distribution Panel (LVMDP) 2500A..." style={{ padding: '12px 16px', fontSize: '15px', fontWeight: 600 }} required />
                      </div>
                      
                      <div className="form-row" style={{ gap: '24px' }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Klien</label>
                          <input type="text" name="client" value={formData.client || ''} onChange={handleChange} placeholder="Nama Perusahaan/Klien" />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Tahun</label>
                          <input type="text" name="year" value={formData.year || ''} onChange={handleChange} placeholder="2023" />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Tag / Kategori</label>
                          <input type="text" name="tag" value={formData.tag || ''} onChange={handleChange} placeholder="Panel Power, dll" />
                        </div>
                      </div>

                      <div className="form-group" style={{ margin: 0, padding: '20px', background: '#f8fafc', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                        <label style={{ marginBottom: '16px' }}>Gambar Portofolio *</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          {formData.img_src && (
                            <img src={formData.img_src} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <label className="btn-edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 18px', borderRadius: '8px', background: '#e0f2fe', color: '#0ea5e9', fontWeight: 600 }}>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'img_src')} style={{ display: 'none' }} />
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                              Pilih Gambar Baru
                            </label>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>Format disarankan: JPG, PNG, WEBP. Maksimal ukuran file 2MB.</p>
                          </div>
                        </div>
                        <input type="hidden" name="img_src" value={formData.img_src || ''} required />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label>Deskripsi Proyek</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="5" placeholder="Tuliskan deskripsi lengkap mengenai hasil kerja/proyek ini..." required style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', background: '#fafafa', border: '1px solid var(--border)' }}></textarea>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="form-row" style={{ gap: '24px' }}>
                        <div className="form-group" style={{ flex: 2, margin: 0 }}>
                          <label>Judul Artikel *</label>
                          <input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Masukkan judul artikel yang menarik..." style={{ padding: '12px 16px', fontSize: '15px', fontWeight: 600 }} required />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Slug (URL) *</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '13px', pointerEvents: 'none' }}>/blog/</span>
                            <input type="text" name="slug" value={formData.slug || ''} onChange={handleChange} placeholder="judul-artikel" style={{ background: '#f8fafc', color: 'var(--primary)', paddingLeft: '54px', fontWeight: 600 }} required />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group" style={{ margin: 0, padding: '20px', background: '#f8fafc', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                        <label style={{ marginBottom: '16px' }}>Gambar Artikel *</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          {formData.img_src && (
                            <img src={formData.img_src} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <label className="btn-edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 18px', borderRadius: '8px', background: '#e0f2fe', color: '#0ea5e9', fontWeight: 600 }}>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'img_src')} style={{ display: 'none' }} />
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                              Pilih Gambar Baru
                            </label>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>Format disarankan: JPG, PNG, WEBP. Maksimal ukuran file 2MB untuk performa optimal.</p>
                          </div>
                        </div>
                        <input type="hidden" name="img_src" value={formData.img_src || ''} required />
                      </div>

                      <div className="form-row" style={{ gap: '24px' }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Penulis</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <input type="text" name="author" value={formData.author || ''} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="Nama Penulis" />
                          </div>
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>Tanggal</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </span>
                            <input type="text" name="date" value={formData.date || ''} onChange={handleChange} style={{ paddingLeft: '40px' }} placeholder="15 Mei 2026" />
                          </div>
                        </div>
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label>Ringkasan (Excerpt) *</label>
                        <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows="2" placeholder="Tuliskan ringkasan singkat 1-2 kalimat untuk preview di halaman blog utama..." required style={{ resize: 'vertical' }}></textarea>
                      </div>
                      
                      <div className="form-group" style={{ margin: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label style={{ margin: 0 }}>Isi Konten *</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="button" onClick={() => insertFormatting('# ', '')} style={{ padding: '4px 8px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '12px', color: '#334155' }}>H1</button>
                            <button type="button" onClick={() => insertFormatting('## ', '')} style={{ padding: '4px 8px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '12px', color: '#334155' }}>H2</button>
                            <button type="button" onClick={() => insertFormatting('### ', '')} style={{ padding: '4px 8px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '12px', color: '#334155' }}>H3</button>
                            <button type="button" onClick={() => insertFormatting('**', '**')} style={{ padding: '4px 8px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 800, fontSize: '12px', color: '#334155' }}>B</button>
                            <button type="button" onClick={() => insertFormatting('*', '*')} style={{ padding: '4px 8px', background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontStyle: 'italic', fontWeight: 600, fontSize: '12px', fontFamily: 'serif', color: '#334155' }}>I</button>
                          </div>
                        </div>
                        <textarea id="blog-content-textarea" name="content" value={formData.content || ''} onChange={handleChange} rows="14" placeholder="Tulis konten lengkap di sini... Anda bisa menggunakan format Markdown seperti # Heading, **bold**, *italic*, dll." required style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', background: '#fafafa', border: '1px solid var(--border)' }}></textarea>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                {(activeTab !== 'blogs' && activeTab !== 'portfolios') ? (
                <div className="form-right-col">
                  <div className="form-group" style={{ margin: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daftar Komponen</label>
                      <button type="button" className="btn-edit" onClick={addPart} style={{ padding: '8px 14px', borderRadius: '8px', fontWeight: 700 }}>+ Tambah Baris</button>
                    </div>
                    <div className="admin-table-container" style={{ border: '1px solid var(--border)', borderRadius: '10px', overflowX: 'auto' }}>
                      <table className="admin-table" style={{ fontSize: '13px', width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--bg-alt)' }}>
                          <tr>
                            <th style={{ padding: '12px 10px', width: '40px', textAlign: 'center' }}>No</th>
                            <th style={{ padding: '12px 10px', minWidth: '150px' }}>Komponen</th>
                            <th style={{ padding: '12px 10px', width: '110px', textAlign: 'center' }}>Qty</th>
                            <th style={{ padding: '12px 10px', minWidth: '130px' }}>Harga Satuan</th>
                            <th style={{ padding: '12px 10px', minWidth: '100px', textAlign: 'center' }}>Stok</th>
                            <th style={{ padding: '12px 10px', width: '50px', textAlign: 'center' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(Array.isArray(formData.parts) ? formData.parts : []).map((part, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '8px 10px', color: 'var(--muted)', textAlign: 'center', fontWeight: 600 }}>{index + 1}</td>
                              <td style={{ padding: '8px 10px' }}>
                                <input list="component-datalist" type="text" value={part.name || ''} onChange={(e) => {
                                  const val = e.target.value;
                                  handlePartChange(index, 'name', val);
                                  const selectedComp = data.components.find(c => c.name === val);
                                  if (selectedComp) {
                                    handlePartChange(index, 'price', selectedComp.price || 0);
                                    if (selectedComp.stock) handlePartChange(index, 'stock', selectedComp.stock);
                                  }
                                }} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} placeholder="Nama komponen" />
                                <datalist id="component-datalist">
                                  {data.components.map(c => <option key={c.id} value={c.name}>{c.brand ? `[${c.brand}] ` : ''}{c.name}</option>)}
                                </datalist>
                              </td>
                              <td style={{ padding: '8px 10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                  <button type="button" onClick={() => handlePartChange(index, 'qty', Math.max(1, (parseInt(part.qty) || 1) - 1))} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--border)', background: '#f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>-</button>
                                  <input type="text" value={part.qty || ''} onChange={(e) => handlePartChange(index, 'qty', e.target.value.replace(/[^0-9]/g, ''))} style={{ width: '40px', padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', textAlign: 'center', boxSizing: 'border-box' }} />
                                  <button type="button" onClick={() => handlePartChange(index, 'qty', (parseInt(part.qty) || 0) + 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--border)', background: '#f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</button>
                                </div>
                              </td>
                              <td style={{ padding: '8px 10px' }}>
                                <input type="number" value={part.price || ''} onChange={(e) => handlePartChange(index, 'price', e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} placeholder="Rp..." />
                              </td>
                              <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                <input 
                                  type="text"
                                  value={part.stock === undefined ? 'ready' : part.stock} 
                                  onChange={(e) => {
                                    let val = e.target.value;
                                    if (!isNaN(val) && val.trim() !== '') val = Number(val);
                                    handlePartChange(index, 'stock', val);
                                  }} 
                                  style={{ 
                                    width: '100%', 
                                    padding: '8px', 
                                    border: '1px solid',
                                    borderColor: ((String(part.stock || 'ready').toLowerCase().trim() === 'ready') || (typeof part.stock === 'number' && part.stock > 0)) ? '#86efac' : '#fca5a5',
                                    backgroundColor: ((String(part.stock || 'ready').toLowerCase().trim() === 'ready') || (typeof part.stock === 'number' && part.stock > 0)) ? '#dcfce7' : '#fee2e2',
                                    color: ((String(part.stock || 'ready').toLowerCase().trim() === 'ready') || (typeof part.stock === 'number' && part.stock > 0)) ? '#16a34a' : '#dc2626',
                                    fontWeight: 'bold',
                                    borderRadius: '6px', 
                                    fontSize: '13px', 
                                    boxSizing: 'border-box',
                                    textAlign: 'center'
                                  }}
                                  placeholder="Ready, Kosong, atau Angka"
                                />
                              </td>
                              <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                                <button type="button" className="btn-delete" onClick={() => removePart(index)} style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }} title="Hapus Baris">✕</button>
                              </td>
                            </tr>
                          ))}
                          {(!formData.parts || formData.parts.length === 0) && (
                            <tr>
                              <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)', fontStyle: 'italic' }}>Belum ada komponen. Klik "+ Tambah Baris" untuk mulai menambahkan.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                ) : (
                <div className="form-right-col" style={{ position: 'sticky', top: '20px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <label style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {activeTab === 'portfolios' ? 'Pratinjau Kartu Portofolio' : 'Pratinjau Kartu Artikel'}
                      </label>
                      <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0284c7', padding: '4px 8px', borderRadius: '20px', fontWeight: 600 }}>Live Preview</span>
                    </div>
                    
                    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
                      <div style={{ width: '100%', height: '180px', background: '#f1f5f9', position: 'relative' }}>
                        {formData.img_src ? (
                          <img src={formData.img_src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)', fontSize: '12px', fontStyle: 'italic' }}>Belum ada gambar</div>
                        )}
                        {(formData.tag && activeTab === 'portfolios') && (
                          <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent)', color: 'var(--dark)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{formData.tag}</span>
                        )}
                      </div>
                      <div style={{ padding: '20px' }}>
                        {activeTab === 'portfolios' ? (
                          <>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                Klien: {formData.client || '-'}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                {formData.year || 'Tahun'}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.4 }}>{formData.title || 'Judul Proyek Akan Tampil Di Sini'}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{formData.description || 'Deskripsi singkat mengenai proyek yang akan muncul di portofolio.'}</p>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                {formData.author || 'Penulis'}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                {formData.date || 'Tanggal'}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.4 }}>{formData.title || 'Judul Artikel Akan Tampil Di Sini'}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{formData.excerpt || 'Ringkasan artikel akan muncul di bagian ini untuk memberikan gambaran singkat kepada pembaca saat melihat daftar blog.'}</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Info Status</h4>
                      <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                        {activeTab === 'blogs' && (
                          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                            <strong>URL:</strong>
                            <span style={{ color: 'var(--primary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/blog/{formData.slug || 'slug-artikel'}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong>Kesiapan:</strong>
                          {(activeTab === 'blogs' ? (formData.title && formData.slug && formData.excerpt && formData.content && formData.img_src) : (formData.title && formData.img_src && formData.description)) ? (
                            <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg> Lengkap
                            </span>
                          ) : (
                            <span style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Belum Lengkap
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

              </form>
            </div>
            <div className="modal-footer" style={{justifyContent: 'flex-end', gap: '10px', background: 'var(--bg-alt)'}}>
              <button className="btn-edit" style={{background: '#e2e8f0', color: '#475569'}} onClick={() => setIsModalOpen(false)}>Batal</button>
              <button type="submit" form="adminForm" className="btn-admin-primary">Simpan Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="admin-toast">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
