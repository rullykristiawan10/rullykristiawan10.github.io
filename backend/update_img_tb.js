const pool = require('./db.js');

async function run() {
  const updates = [
    { name: 'Terminal Block Honeywell 35mm', image: '/images/Picture13.jpg' },
    { name: 'Terminal Block Honeywell 16mm', image: '/images/Picture14.jpg' },
    { name: 'Terminal Block Honeywell 10mm', image: '/images/Picture15.jpg' },
    { name: 'Terminal Block Honeywell 6mm', image: '/images/Picture16.jpg' }
  ];

  try {
    for (const u of updates) {
      const res = await pool.query(
        `UPDATE components SET images = $1 WHERE name = $2 RETURNING *`,
        [JSON.stringify([u.image]), u.name]
      );
      console.log(`Updated ${u.name}:`, res.rows[0] ? 'Success' : 'Not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
