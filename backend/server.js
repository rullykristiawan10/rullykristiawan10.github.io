const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const pool = require('./db');
const { authenticateToken, JWT_SECRET } = require('./middleware/auth');

// Auto-migrate tables
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query("ALTER TABLE components ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    console.log('Database tables verified.');
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
};
initDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// API endpoints
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    // Ensure numeric fields are parsed correctly if needed, though pg handles most well.
    // The frontend expects price as number, kw as number etc.
    const products = result.rows.map(p => ({
      ...p,
      price: Number(p.price),
      power: Number(p.power),
      kw: Number(p.kw)
    }));
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/components', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM components ORDER BY id ASC');
    const components = result.rows.map(c => ({
      ...c,
      price: Number(c.price)
    }));
    res.json(components);
  } catch (err) {
    console.error('Error fetching components:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Admin Auth Endpoints ---

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Username atau password salah.' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Username atau password salah.' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// --- CRUD Products ---

app.post('/api/products', authenticateToken, async (req, res) => {
  const { name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts, stock } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts, stock) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [name, cat, type, brand, method, power || 0, kw || 0, phase, voltage, components || 0, price || 0, 
       features ? JSON.stringify(features) : '[]', parts ? JSON.stringify(parts) : '[]', stock || 'ready']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts, stock } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products 
       SET name=$1, cat=$2, type=$3, brand=$4, method=$5, power=$6, kw=$7, phase=$8, voltage=$9, components=$10, price=$11, features=$12, parts=$13, stock=$15
       WHERE id=$14 RETURNING *`,
      [name, cat, type, brand, method, power || 0, kw || 0, phase, voltage, components || 0, price || 0, 
       features ? JSON.stringify(features) : '[]', parts ? JSON.stringify(parts) : '[]', id, stock || 'ready']
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- CRUD Components ---

app.post('/api/components', authenticateToken, async (req, res) => {
  const { name, category, supplier, price, description, tag, parts, stock, images } = req.body;
  try {
    const partsJson = parts ? JSON.stringify(parts) : '[]';
    const imagesJson = images ? JSON.stringify(images) : '[]';
    const result = await pool.query(
      `INSERT INTO components (name, category, supplier, price, description, tag, parts, stock, images) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, category, supplier, price || 0, description, tag, partsJson, stock || 'ready', imagesJson]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding component:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/components/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, category, supplier, price, description, tag, parts, stock, images } = req.body;
  try {
    const partsJson = parts ? JSON.stringify(parts) : '[]';
    const imagesJson = images ? JSON.stringify(images) : '[]';
    const result = await pool.query(
      `UPDATE components 
       SET name=$1, category=$2, supplier=$3, price=$4, description=$5, tag=$6, parts=$7, stock=$9, images=$10
       WHERE id=$8 RETURNING *`,
      [name, category, supplier, price || 0, description, tag, partsJson, id, stock || 'ready', imagesJson]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Component not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating component:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/components/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM components WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Component not found' });
    res.json({ message: 'Component deleted' });
  } catch (err) {
    console.error('Error deleting component:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Upload Endpoint ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// --- CRUD Blogs ---

app.post('/api/blogs', authenticateToken, async (req, res) => {
  const { slug, title, excerpt, content, tag, author, date, img_src } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO blogs (slug, title, excerpt, content, tag, author, date, img_src) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [slug, title, excerpt, content, tag, author, date, img_src]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding blog:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/blogs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { slug, title, excerpt, content, tag, author, date, img_src } = req.body;
  try {
    const result = await pool.query(
      `UPDATE blogs 
       SET slug=$1, title=$2, excerpt=$3, content=$4, tag=$5, author=$6, date=$7, img_src=$8
       WHERE id=$9 RETURNING *`,
      [slug, title, excerpt, content, tag, author, date, img_src, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM blogs WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Change Admin Password ---
app.put('/api/admin/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password saat ini salah.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    
    await pool.query('UPDATE admins SET password_hash = $1 WHERE id = $2', [hash, req.user.id]);
    res.json({ message: 'Password berhasil diperbarui.' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- CRUD Messages ---
app.post('/api/messages', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO messages (name, email, phone, message, status) 
       VALUES ($1, $2, $3, $4, 'unread') RETURNING *`,
      [name, email, phone, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/messages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE messages SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM messages WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing (Catch-all)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
