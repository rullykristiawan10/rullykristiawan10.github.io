const pool = require('./db');

async function updateAllChintProducts() {
  try {
    const res = await pool.query("SELECT id, name, method, phase FROM products WHERE brand = 'CHINT'");
    const products = res.rows;

    for (let p of products) {
      let parts = [];

      if (p.method === 'DOL') {
        parts = [
          {"name":"MCB 3 Phase (CHINT)","qty":1,"price":"Rp 150.000","notes":"Main Breaker"},
          {"name":"Kontaktor Utama (CHINT)","qty":1,"price":"Rp 180.000","notes":"Switching Motor"},
          {"name":"Thermal Overload Relay (CHINT)","qty":1,"price":"Rp 210.000","notes":"Proteksi Motor"},
          {"name":"Pilot Lamp Red (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Stop"},
          {"name":"Pilot Lamp Green (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Run"},
          {"name":"Pilot Lamp Yellow (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Trip"},
          {"name":"Push Button Green (FORT)","qty":1,"price":"Rp 20.000","notes":"Tombol Start"},
          {"name":"Push Button Red (FORT)","qty":1,"price":"Rp 20.000","notes":"Tombol Stop"},
          {"name":"Terminal Block 12 Pole (CHINT)","qty":1,"price":"Rp 45.000","notes":"Konektor Kabel"},
          {"name":"Panel Box Indoor","qty":1,"price":"Rp 300.000","notes":"Enclosure"},
          {"name":"Engineering & Wiring","qty":1,"price":"Rp 450.000","notes":"Rakit & Testing"}
        ];
      } else if (p.method === 'Star-Delta') {
        parts = [
          {"name":"MCCB 3 Phase (CHINT)","qty":1,"price":"Rp 450.000","notes":"Main Breaker"},
          {"name":"Kontaktor Main (CHINT)","qty":1,"price":"Rp 350.000","notes":"Switching Utama"},
          {"name":"Kontaktor Delta (CHINT)","qty":1,"price":"Rp 350.000","notes":"Mode Delta"},
          {"name":"Kontaktor Star (CHINT)","qty":1,"price":"Rp 250.000","notes":"Mode Star"},
          {"name":"Timer Relay (CHINT)","qty":1,"price":"Rp 180.000","notes":"Pengatur Transisi"},
          {"name":"Thermal Overload Relay (CHINT)","qty":1,"price":"Rp 320.000","notes":"Proteksi Motor"},
          {"name":"Pilot Lamp Red (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Stop"},
          {"name":"Pilot Lamp Green (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Run"},
          {"name":"Pilot Lamp Yellow (FORT)","qty":1,"price":"Rp 15.000","notes":"Indikator Trip"},
          {"name":"Push Button Green (FORT)","qty":1,"price":"Rp 20.000","notes":"Tombol Start"},
          {"name":"Push Button Red (FORT)","qty":1,"price":"Rp 20.000","notes":"Tombol Stop"},
          {"name":"Terminal Block (CHINT)","qty":2,"price":"Rp 90.000","notes":"Konektor Kabel"},
          {"name":"Panel Box Indoor","qty":1,"price":"Rp 550.000","notes":"Enclosure"},
          {"name":"Engineering & Wiring","qty":1,"price":"Rp 800.000","notes":"Rakit & Testing"}
        ];
      } else if (p.method === 'Distribusi') {
        if (p.phase === '3-Phase') {
          parts = [
            {"name":"MCCB / MCB 3 Phase Utama (CHINT)","qty":1,"price":"Rp 850.000","notes":"Main Breaker"},
            {"name":"MCB Outgoing (CHINT)","qty":6,"price":"Rp 360.000","notes":"Sub-Distribusi"},
            {"name":"Busbar Tembaga","qty":1,"price":"Rp 250.000","notes":"Saluran Arus"},
            {"name":"Pilot Lamp R (Merah)","qty":1,"price":"Rp 15.000","notes":"Indikator Fasa R"},
            {"name":"Pilot Lamp S (Kuning)","qty":1,"price":"Rp 15.000","notes":"Indikator Fasa S"},
            {"name":"Pilot Lamp T (Hijau)","qty":1,"price":"Rp 15.000","notes":"Indikator Fasa T"},
            {"name":"Terminal Block (CHINT)","qty":2,"price":"Rp 90.000","notes":"Konektor Kabel"},
            {"name":"Digital Voltmeter / Amperemeter","qty":1,"price":"Rp 200.000","notes":"Monitoring"},
            {"name":"Current Transformer (CT)","qty":3,"price":"Rp 150.000","notes":"Sensor Arus"},
            {"name":"Panel Box Indoor","qty":1,"price":"Rp 450.000","notes":"Enclosure"},
            {"name":"Engineering & Wiring","qty":1,"price":"Rp 600.000","notes":"Rakit & Testing"}
          ];
        } else {
          // 1-Phase
          parts = [
            {"name":"MCB 1 Phase Utama (CHINT)","qty":1,"price":"Rp 120.000","notes":"Main Breaker"},
            {"name":"MCB Outgoing (CHINT)","qty":4,"price":"Rp 180.000","notes":"Sub-Distribusi"},
            {"name":"Busbar Sisir","qty":1,"price":"Rp 50.000","notes":"Saluran Arus"},
            {"name":"Pilot Lamp (Hijau)","qty":1,"price":"Rp 15.000","notes":"Indikator Power"},
            {"name":"Terminal Block (CHINT)","qty":1,"price":"Rp 45.000","notes":"Konektor Kabel"},
            {"name":"Panel Box Indoor","qty":1,"price":"Rp 200.000","notes":"Enclosure"},
            {"name":"Engineering & Wiring","qty":1,"price":"Rp 300.000","notes":"Rakit & Testing"}
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
    console.log(`Successfully updated ${products.length} CHINT products.`);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

updateAllChintProducts();
