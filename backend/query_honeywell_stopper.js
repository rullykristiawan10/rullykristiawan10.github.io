const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'STOPPER TERMINAL BLOCK'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No Stopper Terminal Block found for Honeywell, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['Stopper Terminal Block (Honeywell)', 'STOPPER TERMINAL BLOCK', 'HONEYWELL', 10000, 'Stopper / End bracket untuk terminal block Honeywell.', 'STOPPER TERMINAL BLOCK']
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
