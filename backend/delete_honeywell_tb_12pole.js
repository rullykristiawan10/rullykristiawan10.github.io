const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("DELETE FROM components WHERE supplier = 'HONEYWELL' AND category = 'TERMINAL BLOCKS' AND name ILIKE '%12 Pole%' RETURNING *");
    console.log("Deleted:", res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
