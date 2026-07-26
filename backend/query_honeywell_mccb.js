const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'MCCB'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No MCCB found for Honeywell, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['MCCB 3 Phase 100A Honeywell', 'MCCB', 'HONEYWELL', 1250000, 'Molded Case Circuit Breaker (MCCB) Honeywell 3 Phase untuk proteksi hubung singkat.', 'MCCB']
      );
      console.log("Inserted:", insertRes.rows[0]);
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
