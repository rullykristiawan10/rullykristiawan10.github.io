require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function changeAdmin(username, password) {
  if (!username || !password) {
    console.log("=========================================");
    console.log("Cara penggunaan:");
    console.log("node change_admin.js <username_baru> <password_baru>");
    console.log("Contoh:");
    console.log("node change_admin.js rully rahasiaku123");
    console.log("=========================================");
    process.exit(1);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Hapus semua admin lama agar hanya ada 1 admin yaitu Anda
    await pool.query('DELETE FROM admins');
    
    // Masukkan admin baru
    await pool.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', [username, hash]);
    
    console.log(`\n✅ BERHASIL! Akses Dashboard Admin telah diperbarui.`);
    console.log(`👤 Username Admin : ${username}`);
    console.log(`🔑 Password       : (berhasil disimpan dan dienkripsi)`);
    console.log(`\nSekarang hanya Anda yang tahu kombinasi ini dan bisa mengakses dashboard.\n`);
  } catch (err) {
    console.error('Gagal mengubah admin:', err);
  } finally {
    pool.end();
  }
}

const args = process.argv.slice(2);
changeAdmin(args[0], args[1]);
