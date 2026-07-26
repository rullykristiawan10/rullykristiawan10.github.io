const pool = require('./db');

async function updateAllSchneiderProducts() {
  try {
    const res = await pool.query("SELECT id, name, method, phase FROM products WHERE brand = 'SCHNEIDER'");
    const products = res.rows;

    for (let p of products) {
      let parts = [];

      if (p.method === 'DOL') {
        parts = [
          {"name":"MCB 3 Phase (Schneider)","qty":1,"price":"Rp 250.000","notes":"Main Breaker"},
          {"name":"TeSys D Contactor (Schneider)","qty":1,"price":"Rp 380.000","notes":"Switching Motor"},
          {"name":"TeSys LRD Thermal Overload (Schneider)","qty":1,"price":"Rp 420.000","notes":"Proteksi Motor"},
          {"name":"Pilot Lamp Harmony Red (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Stop"},
          {"name":"Pilot Lamp Harmony Green (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Run"},
          {"name":"Pilot Lamp Harmony Yellow (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Trip"},
          {"name":"Push Button Harmony Green (Schneider)","qty":1,"price":"Rp 75.000","notes":"Tombol Start"},
          {"name":"Push Button Harmony Red (Schneider)","qty":1,"price":"Rp 75.000","notes":"Tombol Stop"},
          {"name":"Terminal Block 12 Pole","qty":1,"price":"Rp 50.000","notes":"Konektor Kabel"},
          {"name":"Panel Box Indoor Standard","qty":1,"price":"Rp 350.000","notes":"Enclosure"},
          {"name":"Engineering & Wiring","qty":1,"price":"Rp 500.000","notes":"Rakit & Testing"}
        ];
      } else if (p.method === 'Star-Delta') {
        parts = [
          {"name":"MCCB 3 Phase (Schneider)","qty":1,"price":"Rp 850.000","notes":"Main Breaker"},
          {"name":"TeSys D Contactor Main (Schneider)","qty":1,"price":"Rp 650.000","notes":"Switching Utama"},
          {"name":"TeSys D Contactor Delta (Schneider)","qty":1,"price":"Rp 650.000","notes":"Mode Delta"},
          {"name":"TeSys D Contactor Star (Schneider)","qty":1,"price":"Rp 450.000","notes":"Mode Star"},
          {"name":"Timer Relay (Schneider)","qty":1,"price":"Rp 380.000","notes":"Pengatur Transisi"},
          {"name":"TeSys LRD Thermal Overload (Schneider)","qty":1,"price":"Rp 620.000","notes":"Proteksi Motor"},
          {"name":"Pilot Lamp Harmony Red (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Stop"},
          {"name":"Pilot Lamp Harmony Green (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Run"},
          {"name":"Pilot Lamp Harmony Yellow (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Trip"},
          {"name":"Push Button Harmony Green (Schneider)","qty":1,"price":"Rp 75.000","notes":"Tombol Start"},
          {"name":"Push Button Harmony Red (Schneider)","qty":1,"price":"Rp 75.000","notes":"Tombol Stop"},
          {"name":"Terminal Block","qty":2,"price":"Rp 100.000","notes":"Konektor Kabel"},
          {"name":"Panel Box Indoor Premium","qty":1,"price":"Rp 650.000","notes":"Enclosure"},
          {"name":"Engineering & Wiring","qty":1,"price":"Rp 900.000","notes":"Rakit & Testing"}
        ];
      } else if (p.method === 'Distribusi') {
        if (p.phase === '3-Phase') {
          parts = [
            {"name":"MCCB 3 Phase Utama (Schneider)","qty":1,"price":"Rp 1.450.000","notes":"Main Breaker"},
            {"name":"MCB Outgoing Acti9 (Schneider)","qty":8,"price":"Rp 560.000","notes":"Sub-Distribusi"},
            {"name":"Busbar Tembaga Murni","qty":1,"price":"Rp 350.000","notes":"Saluran Arus"},
            {"name":"Pilot Lamp Harmony R (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Fasa R"},
            {"name":"Pilot Lamp Harmony S (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Fasa S"},
            {"name":"Pilot Lamp Harmony T (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Fasa T"},
            {"name":"Terminal Block","qty":2,"price":"Rp 100.000","notes":"Konektor Kabel"},
            {"name":"Digital Power Meter (Schneider)","qty":1,"price":"Rp 1.200.000","notes":"Monitoring Listrik"},
            {"name":"Current Transformer (CT)","qty":3,"price":"Rp 250.000","notes":"Sensor Arus"},
            {"name":"Panel Box Indoor Premium","qty":1,"price":"Rp 550.000","notes":"Enclosure"},
            {"name":"Engineering & Wiring","qty":1,"price":"Rp 750.000","notes":"Rakit & Testing"}
          ];
        } else {
          // 1-Phase
          parts = [
            {"name":"MCB 1 Phase Utama Acti9 (Schneider)","qty":1,"price":"Rp 180.000","notes":"Main Breaker"},
            {"name":"MCB Outgoing Acti9 (Schneider)","qty":5,"price":"Rp 350.000","notes":"Sub-Distribusi"},
            {"name":"Busbar Sisir Schneider","qty":1,"price":"Rp 85.000","notes":"Saluran Arus"},
            {"name":"Pilot Lamp Harmony Green (Schneider)","qty":1,"price":"Rp 55.000","notes":"Indikator Power"},
            {"name":"Terminal Block","qty":1,"price":"Rp 50.000","notes":"Konektor Kabel"},
            {"name":"Panel Box Indoor Standard","qty":1,"price":"Rp 250.000","notes":"Enclosure"},
            {"name":"Engineering & Wiring","qty":1,"price":"Rp 350.000","notes":"Rakit & Testing"}
          ];
        }
      }

      if (parts.length > 0) {
        await pool.query(
          "UPDATE products SET components = $1, parts = $2 WHERE id = $3",
          [parts.length, JSON.stringify(parts), p.id]
        );
      }
    }
    console.log(`Successfully updated ${products.length} SCHNEIDER products.`);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

updateAllSchneiderProducts();
