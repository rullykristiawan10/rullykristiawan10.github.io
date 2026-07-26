const pool = require('./db.js');
pool.query("SELECT name, parts FROM components WHERE category='MCB' AND supplier='HONEYWELL'")
  .then(res => {
    console.log(JSON.stringify(res.rows, null, 2));
    pool.end();
  });
