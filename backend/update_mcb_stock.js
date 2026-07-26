const pool = require('./db.js');

async function updateStock() {
  try {
    const res = await pool.query("SELECT id, parts FROM components WHERE name='MCB 3 Phase HONEYWELL'");
    if (res.rows.length > 0) {
      const comp = res.rows[0];
      let parts = comp.parts;
      
      // Update parts to demonstrate numeric stock
      parts[0].stock = 100; // HMS-3D4
      parts[1].stock = 5;   // HMS-3D10
      parts[2].stock = 0;   // HMS-3D20 (Habis)
      parts[3].stock = 'ready'; // HMS-3D32 (Legacy ready)
      parts[4].stock = 'kosong'; // HMS-3D40 (Legacy kosong)
      
      await pool.query("UPDATE components SET parts=$1 WHERE id=$2", [JSON.stringify(parts), comp.id]);
      console.log('Stock updated successfully');
    } else {
      console.log('Component not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

updateStock();
