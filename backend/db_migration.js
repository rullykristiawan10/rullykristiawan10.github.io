const pool = require('./db.js');

async function migrate() {
  try {
    await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    console.log("Added stock to products");
    await pool.query("ALTER TABLE components ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    console.log("Added stock to components");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

migrate();
