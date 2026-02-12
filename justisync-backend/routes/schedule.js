const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// 1. GET: Fetch Schedules
router.get('/', auth, async (req, res) => {
    try {
        const query = `
            SELECT 
                schedule_id AS id,
                title,
                TO_CHAR(hearing_date, 'YYYY-MM-DD') AS date, -- Frontend needs strict format
                TO_CHAR(start_time, 'HH24:MI') AS time,
                event_type AS type
            FROM schedules
        `;
        const events = await pool.query(query);
        res.json(events.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 2. POST: Create New Schedule (Yeh Missing Tha!)
router.post('/', auth, async (req, res) => {
    try {
        const { title, date, time, type } = req.body;
        
        // Note: Hum abhi dummy case_id=101 use kar rahe hain agar frontend case select nahi kar raha.
        // Asli app mein aapko dropdown se case_id bhejna chahiye.
        const newEvent = await pool.query(
            "INSERT INTO schedules (case_id, title, hearing_date, start_time, end_time, event_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [101, title, date, time, time, type] 
        );
        
        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;