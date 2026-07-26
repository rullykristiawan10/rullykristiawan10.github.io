const pool = require('./db');
const { PRODUCTS, COMPONENTS } = require('./data');

async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Create Tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cat VARCHAR(100),
        type VARCHAR(100),
        brand VARCHAR(100),
        method VARCHAR(100),
        power NUMERIC,
        kw NUMERIC,
        phase VARCHAR(50),
        voltage VARCHAR(50),
        components INTEGER,
        price NUMERIC,
        features JSONB,
        parts JSONB
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS components (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        supplier VARCHAR(100),
        price NUMERIC,
        description TEXT,
        tag VARCHAR(100)
      );
    `);

    // Clear existing data to prevent duplicates on re-run
    await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE components RESTART IDENTITY CASCADE;');

    console.log('Tables created and cleared.');

    // Seed Products
    for (const p of PRODUCTS) {
      await pool.query(`
        INSERT INTO products 
        (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        p.name, p.cat, p.type, p.brand, p.method, p.power, p.kw, p.phase, p.voltage, p.components, p.price,
        JSON.stringify(p.features || []),
        JSON.stringify(p.parts || [])
      ]);
    }
    console.log(`Inserted ${PRODUCTS.length} products.`);

    // Seed Components
    for (const c of COMPONENTS) {
      await pool.query(`
        INSERT INTO components 
        (name, category, supplier, price, description, tag)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        c.name, c.category, c.supplier, c.price, c.description, c.tag
      ]);
    }
    console.log(`Inserted ${COMPONENTS.length} components.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
