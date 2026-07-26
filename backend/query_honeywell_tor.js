const pool = require('./db.js');

async function run() {
  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'HONEYWELL' AND category = 'THERMAL OVERLOAD RELAY'");
    console.log("Found:", res.rows);
    if (res.rows.length === 0) {
      console.log("No Thermal Overload Relay found for Honeywell, inserting one...");
      const insertRes = await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        ['Thermal Overload Relay Honeywell', 'THERMAL OVERLOAD RELAY', 'HONEYWELL', 185000, 'Relay termal Honeywell pelindung beban lebih pada motor.', 'THERMAL OVERLOAD RELAY']
      );
      console.log("Inserted:", insertRes.rows[0]);
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
