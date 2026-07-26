const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'SCHNEIDER' AND name ILIKE '%Auxiliary%'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No Auxiliary contact found for Schneider, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['Auxiliary Contact iOF Schneider', 'MCB', 'SCHNEIDER', 45000, 'Kontak bantu (Auxiliary Contact) iOF untuk MCB Schneider.', 'MCB']
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
