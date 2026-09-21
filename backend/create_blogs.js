const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.yqagoxcckupigtbelcgl:Mitraclimapro456%40@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255),
      title VARCHAR(255),
      excerpt TEXT,
      content TEXT,
      tag VARCHAR(100),
      author VARCHAR(100),
      date VARCHAR(100),
      img_src VARCHAR(255)
    )
  `);
  console.log('Blogs table created!');
  process.exit(0);
}
run();
