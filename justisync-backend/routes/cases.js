const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware'); // Middleware to get user_id

router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const role = req.user.role;
        
        let query = "";
        let values = [userId];

        if (role === 'Lawyer') {
            // LAWYER VIEW: Join 'cases' with 'case_lawyers' table
            query = `
                SELECT 
                    c.case_id,
                    c.case_number,
                    c.title,
                    u.full_name AS client_name,  -- Fetch Client Name from users table
                    c.case_type,
                    c.status,
                    c.evidence_status AS evidence,
                    TO_CHAR(c.filing_date, 'DD Mon YYYY') AS date
                FROM cases c
                JOIN case_lawyers cl ON c.case_id = cl.case_id
                LEFT JOIN users u ON c.client_id = u.user_id
                WHERE cl.lawyer_id = $1
            `;
        } 
        else if (role === 'Judge') {
            // JUDGE VIEW: Filter by 'judge_id' in cases table
            query = `
                SELECT 
                    c.case_id,
                    c.case_number,
                    c.title,
                    c.priority,
                    c.status,
                    TO_CHAR(c.filing_date, 'DD Mon YYYY') AS filing_date
                FROM cases c
                WHERE c.judge_id = $1
            `;
        } 
        else {
            // CLIENT VIEW: Filter by 'client_id' in cases table
            query = `
                SELECT * FROM cases WHERE client_id = $1
            `;
        }

        const allCases = await pool.query(query, values);
        res.json(allCases.rows);

    } catch (err) {
        console.error("Cases Error:", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;