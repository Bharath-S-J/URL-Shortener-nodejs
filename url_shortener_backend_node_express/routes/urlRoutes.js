const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginal } = require('../controllers/urlController');

// POST /shorten?originalUrl=...
router.post('/shorten', shortenUrl);

// GET /:shortUrl
router.get('/:shortUrl', redirectToOriginal);

module.exports = router;
