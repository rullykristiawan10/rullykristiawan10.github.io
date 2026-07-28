const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Mitraclimapro456%40@db.yqagoxcckupigtbelcgl.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await pool.query("ALTER TABLE components ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    console.log("Added stock to components");
    await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS stock VARCHAR(50) DEFAULT 'ready'");
    console.log("Added stock to products");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}
run();
