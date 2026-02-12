const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    // 1. Destructure with a default value for phone (Fixes the crash)
    const { name, email, password, role, phone = null } = req.body;
    
    try {
        // 2. Check if user exists
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExist.rows.length > 0) {
            return res.status(401).json({ message: "User already exists!" });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Format Role
        const formattedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Client';

        // 5. Insert into Database
        const newUser = await pool.query(
            "INSERT INTO users (full_name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, email, hashedPassword, formattedRole, phone]
        );

        // 6. Generate Token
        const token = jwt.sign(
            { user_id: newUser.rows[0].user_id, role: formattedRole }, 
            'SECRET_KEY', 
            { expiresIn: '1h' }
        );
        
        res.json({ token, user: newUser.rows[0] });

    } catch (err) {
        console.error("Database Error:", err.message);
        // Fix: Send JSON error so frontend can read it instead of crashing
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const validPass = await bcrypt.compare(password, user.rows[0].password);
        if (!validPass) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { user_id: user.rows[0].user_id, role: user.rows[0].role }, 
            'SECRET_KEY', 
            { expiresIn: '1h' }
        );
        res.json({ token, user: user.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;