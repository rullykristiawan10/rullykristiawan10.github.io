const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:Mitraclimapro456%40@db.yqagoxcckupigtbelcgl.supabase.co:5432/postgres',
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
