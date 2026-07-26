const pool = require('./db.js');

async function run() {
  const componentName = 'Pilot Light & Buzzer CHINT 22mm';
  
  const parts = [
    { name: 'Buzzer Merah NFM1-22/LC AC220V', stock: 50, qty: 1, price: 25000 },
    { name: 'Pilot Light Kuning ND16-22DS/4 AC220V', stock: 50, qty: 1, price: 15000 },
    { name: 'Pilot Light Putih ND16-22DS/4 AC220V', stock: 50, qty: 1, price: 15000 }
  ];

  try {
    const res = await pool.query("SELECT * FROM components WHERE supplier = 'CHINT' AND name = $1", [componentName]);
    if (res.rows.length === 0) {
      console.log(`Inserting ${componentName}...`);
      await pool.query(
        `INSERT INTO components (name, category, supplier, price, description, tag, parts) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          componentName, 
          'PILOT LIGHT', 
          'CHINT', 
          15000, 
          'Lampu indikator pilot light dan buzzer CHINT ukuran 22mm.', 
          'PILOT LIGHT',
          JSON.stringify(parts)
        ]
      );
      console.log('Inserted successfully!');
    } else {
      console.log(`${componentName} already exists. Updating parts...`);
      await pool.query(
        `UPDATE components SET parts = $1 WHERE id = $2`,
        [JSON.stringify(parts), res.rows[0].id]
      );
      console.log('Updated successfully!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
