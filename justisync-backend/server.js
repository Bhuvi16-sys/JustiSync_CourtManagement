const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Connect to Database (THIS WAS MISSING)
require('./db'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cases', require('./routes/cases'));
app.use('/api/schedule', require('./routes/schedule'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});