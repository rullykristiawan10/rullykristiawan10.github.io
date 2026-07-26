const pool = require('./db.js');

async function run() {
  try {
    console.log("Adding 'parts' column to 'components' table...");
    await pool.query("ALTER TABLE components ADD COLUMN IF NOT EXISTS parts JSONB DEFAULT '[]'::jsonb;");
    console.log("Column 'parts' added successfully.");
  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    pool.end();
  }
}

run();
