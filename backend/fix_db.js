const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.yqagoxcckupigtbelcgl:Mitraclimapro456%40@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres',
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
