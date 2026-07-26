require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedExtraPanels() {
  const extraProducts = [
    // Panel Power (LVMDP / SDP)
    {
      name: 'LVMDP 3 Phase 1000A',
      cat: 'PANEL POWER',
      type: 'power',
      brand: 'SCHNEIDER',
      method: 'Distribusi Utama',
      power: 0,
      kw: 0,
      phase: '3-Phase',
      voltage: '380V',
      components: 18,
      price: 45000000,
      features: ['ACB 1000A', 'Busbar Tembaga Murni', 'Digital Power Meter', 'Kapasitor Bank Ready'],
      parts: []
    },
    {
      name: 'Panel SDP (Sub Distribution Panel) 400A',
      cat: 'PANEL POWER',
      type: 'power',
      brand: 'CHINT',
      method: 'Distribusi Cabang',
      power: 0,
      kw: 0,
      phase: '3-Phase',
      voltage: '380V',
      components: 12,
      price: 18500000,
      features: ['MCCB 400A', 'Busbar', 'Voltmeter', 'Amperemeter'],
      parts: []
    },
    {
      name: 'Panel Capacitor Bank 50 kVAR',
      cat: 'PANEL POWER',
      type: 'power',
      brand: 'SCHNEIDER',
      method: 'Kompensasi Daya',
      power: 50,
      kw: 50,
      phase: '3-Phase',
      voltage: '380V',
      components: 15,
      price: 22000000,
      features: ['Power Factor Controller', 'Kapasitor Schneider', 'Magnetic Contactor Khusus Kapasitor'],
      parts: []
    },
    {
      name: 'Panel Sinkron Genset (ATS/AMF) 100kVA',
      cat: 'PANEL POWER',
      type: 'power',
      brand: 'FORT',
      method: 'Auto Transfer Switch',
      power: 100,
      kw: 80,
      phase: '3-Phase',
      voltage: '380V',
      components: 20,
      price: 15000000,
      features: ['Motorized COS', 'Modul AMF Deep Sea', 'Battery Charger'],
      parts: []
    },

    // Panel Kontrol (VFD / PLC / Soft Starter)
    {
      name: 'Panel Kontrol Pompa Transfer (2 Pompa) Auto/Manual',
      cat: 'PANEL KONTROL',
      type: 'controls',
      brand: 'OMRON',
      method: 'WLC / Float Switch',
      power: 3,
      kw: 3,
      phase: '3-Phase',
      voltage: '380V',
      components: 14,
      price: 4500000,
      features: ['Water Level Control (WLC)', 'Selector Auto/Manual', 'Alarm Buzzer', 'Proteksi Dry Run'],
      parts: []
    },
    {
      name: 'Panel Kontrol Chiller VFD 15kW',
      cat: 'PANEL KONTROL',
      type: 'controls',
      brand: 'SIEMENS',
      method: 'VFD (Inverter)',
      power: 15,
      kw: 15,
      phase: '3-Phase',
      voltage: '380V',
      components: 12,
      price: 21500000,
      features: ['Inverter Siemens', 'PID Control Ready', 'Bypass Contactor', 'Cooling Fan Panel'],
      parts: []
    },
    {
      name: 'Panel Smart Building SCADA (PLC Base)',
      cat: 'PANEL KONTROL',
      type: 'controls',
      brand: 'WECON',
      method: 'PLC + HMI',
      power: 0,
      kw: 0,
      phase: '3-Phase',
      voltage: '220V',
      components: 25,
      price: 18000000,
      features: ['PLC Wecon 24 I/O', 'HMI Touchscreen 10 Inch', 'Ethernet Comm', 'Data Logging'],
      parts: []
    }
  ];

  try {
    for (const p of extraProducts) {
      // Check if product already exists
      const check = await pool.query('SELECT id FROM products WHERE name = $1', [p.name]);
      if (check.rows.length === 0) {
        await pool.query(
          `INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            p.name, p.cat, p.type, p.brand, p.method, p.power, p.kw, p.phase, p.voltage, p.components, p.price, 
            JSON.stringify(p.features), JSON.stringify(p.parts)
          ]
        );
        console.log(`Inserted: ${p.name}`);
      } else {
        console.log(`Skipped (already exists): ${p.name}`);
      }
    }
    console.log('Finished seeding extra panels.');
  } catch (err) {
    console.error('Error seeding panels:', err);
  } finally {
    pool.end();
  }
}

seedExtraPanels();
