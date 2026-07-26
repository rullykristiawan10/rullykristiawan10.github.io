const pool = require('./db');

async function updateChint() {
  const parts = [
    {"name":"NXB-63 3P C4 6kA (CHINT)","qty":1,"price":"Rp 150.458","notes":"Main Breaker"},
    {"name":"NXC-09 220V 9A (CHINT)","qty":1,"price":"Rp 156.542","notes":"Kontaktor Utama"},
    {"name":"NXR-25 1.25–2A (CHINT)","qty":1,"price":"Rp 205.302","notes":"Proteksi Overload"},
    {"name":"Pilot Lamp 22mm Red (FORT)","qty":1,"price":"Rp 16.200","notes":"Indikator Run"},
    {"name":"Pilot Lamp 22mm Green (FORT)","qty":1,"price":"Rp 16.200","notes":"Indikator Stop"},
    {"name":"Push Button 22mm Green (FORT)","qty":1,"price":"Rp 17.800","notes":"Start"},
    {"name":"Push Button 22mm Red (FORT)","qty":1,"price":"Rp 17.800","notes":"Stop"},
    {"name":"Terminal Block 12 Pole (CHINT)","qty":1,"price":"Rp 45.000","notes":"Konektor Kabel"},
    {"name":"Panel Box 35×25×15 Indoor (FORT)","qty":1,"price":"Rp 290.000","notes":"Enclosure"},
    {"name":"Engineering & Wiring","qty":1,"price":"Rp 391.636","notes":"Jasa rakit, wiring, kabel, terminal, aksesori, testing & QC"}
  ];

  try {
    const res = await pool.query(
      "UPDATE products SET components = 10, parts = $1 WHERE name = 'Motor Control Panel 0.75kW' AND brand = 'CHINT' RETURNING *",
      [JSON.stringify(parts)]
    );
    console.log("Updated rows:", res.rows.length);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

updateChint();
