const pool = require('./db.js');
(async () => {
  try {
    const res = await pool.query(
      `UPDATE components SET images = $1 WHERE name = $2 RETURNING *`,
      [JSON.stringify(['/images/Picture1.jpg']), 'MCB 1 Phase HONEYWELL']
    );
    console.log(res.rows[0]);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
})();
