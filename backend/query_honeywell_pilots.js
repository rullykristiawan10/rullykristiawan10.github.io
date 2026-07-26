const pool = require('./db.js');

async function run() {
  const products = [
    ['Pilot Light 22mm Green', 'PILOT LIGHT', 'HONEYWELL', 25000, 'Indikator lampu hijau terang standar industri.', 'PILOT LIGHT'],
    ['Pilot Light 22mm Yellow', 'PILOT LIGHT', 'HONEYWELL', 25000, 'Indikator lampu kuning terang standar industri.', 'PILOT LIGHT'],
    ['Pilot Light 22mm White', 'PILOT LIGHT', 'HONEYWELL', 25000, 'Indikator lampu putih terang standar industri.', 'PILOT LIGHT'],
    ['Pilot Light 22mm Blue', 'PILOT LIGHT', 'HONEYWELL', 25000, 'Indikator lampu biru terang standar industri.', 'PILOT LIGHT']
  ];

  try {
    for (const p of products) {
      const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND name = $1", [p[0]]);
      if (res.rows.length === 0) {
        console.log(`Inserting ${p[0]}...`);
        await pool.query(
          `INSERT INTO components (name, category, supplier, price, description, tag) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          p
        );
      } else {
        console.log(`${p[0]} already exists.`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
