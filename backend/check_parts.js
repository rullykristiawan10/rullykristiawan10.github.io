const pool = require('./db.js');
pool.query('SELECT id, name, parts FROM components WHERE parts IS NOT NULL').then(res => { 
  const withParts = res.rows.filter(r => { 
    try { 
      return typeof r.parts === "string" ? JSON.parse(r.parts).length > 0 : r.parts.length > 0; 
    } catch(e) { 
      return false; 
    } 
  });
  console.log(JSON.stringify(withParts, null, 2)); 
  pool.end(); 
});
