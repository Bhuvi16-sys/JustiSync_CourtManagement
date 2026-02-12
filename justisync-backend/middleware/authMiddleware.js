// File: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // YAHAN BHI WAHI SAME 'SECRET_KEY' HONA CHAHIYE
        const decoded = jwt.verify(token, 'SECRET_KEY'); 
        
        req.user = decoded;
        console.log("✅ Auth Success! User ID:", req.user.user_id);
        next();
    } catch (err) {
        console.error("❌ Auth Failed: Token Galat/Expired hai!");
        res.status(401).json({ msg: 'Token is not valid' });
    }
};