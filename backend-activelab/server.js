const express = require('express');
const cors = require('cors');
const db = require('./db'); // Memanggil file koneksi database kita

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// ENDPOINT MEMBERS (SUDAH PAKAI DATABASE)
// ==========================================

// 1. GET: Menampilkan semua data member
app.get('/api/members', (req, res) => {
  const sql = 'SELECT * FROM members';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 2. POST: Menambah data member baru (Untuk tombol Add Member)
app.post('/api/members', (req, res) => {
  const { name, membership_status, expiry_date } = req.body;
  
  const sql = 'INSERT INTO members (name, membership_status, expiry_date) VALUES (?, ?, ?)';
  db.query(sql, [name, membership_status, expiry_date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Member berhasil ditambahkan!', id: result.insertId });
  });
});

// 3. PUT: Mengedit data member (Untuk tombol Edit)
app.put('/api/members/:id', (req, res) => {
  const { id } = req.params; // Mengambil ID dari URL
  const { name, membership_status, expiry_date } = req.body; // Mengambil data baru dari frontend
  
  const sql = 'UPDATE members SET name = ?, membership_status = ?, expiry_date = ? WHERE id = ?';
  db.query(sql, [name, membership_status, expiry_date, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Data member berhasil diupdate!' });
  });
});

// 4. DELETE: Menghapus data member (Untuk tombol Delete)
app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params; // Mengambil ID dari URL

  const sql = 'DELETE FROM members WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Member berhasil dihapus!' });
  });
});

// ==========================================
// ENDPOINT LAINNYA (MASIH MOCK DATA)
// ==========================================
app.get('/api/dashboard', (req, res) => {
  // Perintah SQL untuk menghitung total baris di tabel members
  const sql = 'SELECT COUNT(*) AS total_members FROM members';
  
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Mengambil hasil hitungan dari database
    const totalMembersFromDB = result[0].total_members;

    // Menggabungkan data asli (members) dengan data statis (metrik lainnya)
    res.json({
      totalActiveMembers: totalMembersFromDB,
      todaysOrder: 15,       // Data sementara
      thisMonthsIncome: 120, // Data sementara
      newMemberThisWeek: 3   // Data sementara
    });
  });
});

// GET: Mengambil semua jadwal layanan/kelas
app.get('/api/services', (req, res) => {
  const sql = 'SELECT * FROM services';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST: Menambah ruangan atau kelas baru
app.post('/api/services', (req, res) => {
  const { category, name, status, staff_name, capacity } = req.body;
  
  const sql = 'INSERT INTO services (category, name, status, staff_name, capacity) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [category, name, status, staff_name, capacity], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Ruangan/Kelas berhasil ditambahkan!', id: result.insertId });
  });
});

// DELETE: Menghapus ruangan atau kelas
app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM services WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Ruangan/Kelas berhasil dihapus!' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Express jalan di http://localhost:${PORT}`);
});