const pool = require('./db.js');

async function checkPrices() {
  try {
    const res = await pool.query("SELECT id, name, price, parts FROM components WHERE name ILIKE '%HONEYWELL%' OR price = 2137107");
    for (let comp of res.rows) {
      console.log(`Comp: ${comp.name}, Price: ${comp.price}, Parts Length: ${comp.parts ? comp.parts.length : 0}`);
      if (comp.parts && comp.parts.length > 0) {
        console.log(`Part 1 Price: ${comp.parts[0].price}`);
        
        let sumPrice = comp.parts.reduce((sum, p) => sum + ((parseInt(p.qty) || 0) * (Number(p.price) || 0)), 0);
        console.log(`Calculated Sum: ${sumPrice}`);
      }
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkPrices();
