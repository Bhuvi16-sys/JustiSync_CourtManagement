// File: backend/test-db.js
const { Pool } = require('pg');

// Isme wahi details daalein jo aapne db.js mein daali hain
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'justisync_db',
  password: 'Bhuvi7580', // <--- YAHAN APNA ASLI PASSWORD LIKHEIN
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ CONNECTION FAIL:', err.message);
  } else {
    console.log('✅ CONNECTION SUCCESS! Time:', res.rows[0].now);
  }
});
module.exports = pool;