const pool = require('./db.js');
(async () => {
  try {
    const res = await pool.query(`SELECT * FROM components WHERE name='MCB 3 Phase HONEYWELL'`);
    console.log(res.rows[0]);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
})();
