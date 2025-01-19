const express = require('express');
const router = express.Router();

// Endpoint pentru verificarea funcționării
router.get('/test', (req, res) => {
    res.send('Ruta users.js funcționează!');
});

module.exports = router;
