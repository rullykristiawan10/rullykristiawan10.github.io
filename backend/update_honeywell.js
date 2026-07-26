const pool = require('./db');

async function updateHoneywell() {
  try {
    const res = await pool.query("UPDATE products SET components = 11 WHERE brand = 'HONEYWELL' RETURNING *");
    console.log("Updated rows:", res.rows.length);
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

updateHoneywell();
