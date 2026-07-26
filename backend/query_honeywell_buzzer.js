const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'BUZZER'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No Buzzer found for Honeywell, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['Buzzer 22mm (Honeywell)', 'BUZZER', 'HONEYWELL', 50000, 'Buzzer alarm panel Honeywell 22mm.', 'BUZZER']
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
