const pool = require('./db.js');

(async () => {
  try {
    await pool.query('ALTER TABLE components ADD COLUMN IF NOT EXISTS images JSONB;');
    const res = await pool.query(
      `UPDATE components SET images = $1 WHERE name = $2 RETURNING *`,
      [JSON.stringify(['/images/Picture18.jpg']), 'MCB 3 Phase HONEYWELL']
    );
    console.log('Rows updated:', res.rowCount);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
})();
