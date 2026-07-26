const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'HANDLE SELECT SWITCH'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No Handle Select Switch found for Honeywell, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['Handle Select Switch 2 Posisi (Honeywell)', 'HANDLE SELECT SWITCH', 'HONEYWELL', 45000, 'Handle select switch 2 posisi Honeywell untuk kontrol panel.', 'HANDLE SELECT SWITCH']
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
