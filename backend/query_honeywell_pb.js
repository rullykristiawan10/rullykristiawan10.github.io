const pool = require('./db.js');

async function run() {
  try {
    const insertRes = await pool.query(
      `INSERT INTO components (name, category, supplier, price, description, tag) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      ['Push Button 22mm Red', 'PUSH BUTTON', 'HONEYWELL', 35000, 'Tombol tekan merah Honeywell untuk instruksi stop.', 'PUSH BUTTON']
    );
    console.log("Inserted:", insertRes.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
