const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'MCB'");
    console.log("Found:", res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
