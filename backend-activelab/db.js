const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Username default XAMPP
  password: '',      // Password default XAMPP (kosong)
  database: 'activelab_db'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
    return;
  }
  console.log('✅ Berhasil terhubung ke database MySQL!');
});

module.exports = db;