const pool = require('./db');

async function updateHoneywellParts() {
  const honeywellMotorParts = JSON.stringify([
    { name: 'MCCB 3 Phase 100A Honeywell', qty: 1, price: 'Rp 1.250.000', notes: 'Main Breaker' },
    { name: 'Magnetic Contactor 65A Honeywell', qty: 1, price: 'Rp 850.000', notes: 'Kontaktor Utama' },
    { name: 'Thermal Overload Relay Honeywell', qty: 1, price: 'Rp 295.000', notes: 'Proteksi Overload' },
    { name: 'Pilot Light 22mm Red Honeywell', qty: 1, price: 'Rp 25.000', notes: 'Indikator Run' },
    { name: 'Pilot Light 22mm Green Honeywell', qty: 1, price: 'Rp 25.000', notes: 'Indikator Stop' },
    { name: 'Push Button 22mm Green Honeywell', qty: 1, price: 'Rp 35.000', notes: 'Tombol Start' },
    { name: 'Push Button 22mm Red Honeywell', qty: 1, price: 'Rp 35.000', notes: 'Tombol Stop' },
    { name: 'Terminal Block 12 Pole Honeywell', qty: 1, price: 'Rp 65.000', notes: 'Terminal Kabel' },
    { name: 'Relay Miniature 24VDC Honeywell', qty: 2, price: 'Rp 90.000', notes: 'Relay Kontrol' },
    { name: 'Panel Box Wallmount Indoor', qty: 1, price: 'Rp 450.000', notes: 'Enclosure Panel' },
    { name: 'Engineering, Wiring & Testing', qty: 1, price: 'Rp 800.000', notes: 'Jasa Perakitan Panel' }
  ]);

  const honeywellDistParts = JSON.stringify([
    { name: 'MCCB 3 Phase 100A Honeywell', qty: 1, price: 'Rp 1.250.000', notes: 'Pemutus Distribusi Utama' },
    { name: 'MCB 3 Phase 32A Honeywell', qty: 3, price: 'Rp 864.000', notes: 'Pemutus Sub-Distribusi' },
    { name: 'Busbar Tembaga Murni', qty: 1, price: 'Rp 350.000', notes: 'Saluran Distribusi Arus' },
    { name: 'Terminal Block 12 Pole Honeywell', qty: 2, price: 'Rp 130.000', notes: 'Konektor Kabel Outgoing' },
    { name: 'Pilot Light 22mm Red Honeywell', qty: 1, price: 'Rp 25.000', notes: 'Indikator Fasa R' },
    { name: 'Pilot Light 22mm Yellow Honeywell', qty: 1, price: 'Rp 25.000', notes: 'Indikator Fasa S' },
    { name: 'Pilot Light 22mm Green Honeywell', qty: 1, price: 'Rp 25.000', notes: 'Indikator Fasa T' },
    { name: 'Digital Voltmeter / Amperemeter', qty: 1, price: 'Rp 250.000', notes: 'Monitoring Listrik' },
    { name: 'Current Transformer (CT)', qty: 3, price: 'Rp 180.000', notes: 'Sensor Pembacaan Arus' },
    { name: 'Panel Box Indoor', qty: 1, price: 'Rp 450.000', notes: 'Enclosure Panel Distribusi' },
    { name: 'Engineering & Wiring Standard', qty: 1, price: 'Rp 650.000', notes: 'Rakit, Wiring, & Testing' }
  ]);

  try {
    await pool.query("UPDATE products SET parts = $1 WHERE brand = 'HONEYWELL' AND type = 'motor'", [honeywellMotorParts]);
    await pool.query("UPDATE products SET parts = $1 WHERE brand = 'HONEYWELL' AND type = 'distribusi'", [honeywellDistParts]);
    console.log("Updated Honeywell parts successfully.");
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

updateHoneywellParts();
