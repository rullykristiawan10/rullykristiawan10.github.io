const fs = require('fs');
const { PRODUCTS, COMPONENTS } = require('./data');

let sql = `-- Database: mitraclima
-- SQL script to seed the database

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

CREATE TABLE IF NOT EXISTS components (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  supplier VARCHAR(100),
  price NUMERIC,
  description TEXT,
  tag VARCHAR(100)
);

TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE components RESTART IDENTITY CASCADE;

`;

function escapeString(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

for (const p of PRODUCTS) {
  const features = escapeString(JSON.stringify(p.features || []));
  const parts = escapeString(JSON.stringify(p.parts || []));
  sql += `INSERT INTO products (name, cat, type, brand, method, power, kw, phase, voltage, components, price, features, parts) VALUES (` +
    `${escapeString(p.name)}, ` +
    `${escapeString(p.cat)}, ` +
    `${escapeString(p.type)}, ` +
    `${escapeString(p.brand)}, ` +
    `${escapeString(p.method)}, ` +
    `${p.power || 0}, ` +
    `${p.kw || 0}, ` +
    `${escapeString(p.phase)}, ` +
    `${escapeString(p.voltage)}, ` +
    `${p.components || 0}, ` +
    `${p.price || 0}, ` +
    `${features}, ` +
    `${parts}` +
  `);\n`;
}

sql += '\n';

for (const c of COMPONENTS) {
  sql += `INSERT INTO components (name, category, supplier, price, description, tag) VALUES (` +
    `${escapeString(c.name)}, ` +
    `${escapeString(c.category)}, ` +
    `${escapeString(c.supplier)}, ` +
    `${c.price || 0}, ` +
    `${escapeString(c.description)}, ` +
    `${escapeString(c.tag)}` +
  `);\n`;
}

fs.writeFileSync('mitraclima.sql', sql);
console.log('mitraclima.sql generated successfully.');
