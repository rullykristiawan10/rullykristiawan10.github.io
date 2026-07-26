const pool = require('./db.js');
pool.query("SELECT id, name, images FROM components WHERE category='TERMINAL BLOCKS' AND supplier='HONEYWELL'")
  .then(res => {
    console.log(res.rows);
    pool.end();
  });
