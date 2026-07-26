const pool = require('./db.js');

async function run() {
  const products = [
    ['Terminal Block Honeywell 2.5mm', 'TERMINAL BLOCKS', 'HONEYWELL', 5000, 'Terminal blok 2.5mm Honeywell.', 'TERMINAL BLOCKS'],
    ['Terminal Block Honeywell 4mm', 'TERMINAL BLOCKS', 'HONEYWELL', 6000, 'Terminal blok 4mm Honeywell.', 'TERMINAL BLOCKS'],
    ['Terminal Block Honeywell 6mm', 'TERMINAL BLOCKS', 'HONEYWELL', 8000, 'Terminal blok 6mm Honeywell.', 'TERMINAL BLOCKS'],
    ['Terminal Block Honeywell 10mm', 'TERMINAL BLOCKS', 'HONEYWELL', 12000, 'Terminal blok 10mm Honeywell.', 'TERMINAL BLOCKS']
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
