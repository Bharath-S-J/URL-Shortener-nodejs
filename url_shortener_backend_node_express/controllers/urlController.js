// controllers/urlController.js
const { shortenUrl, getOriginalUrl } = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
  const originalUrl = req.query.originalUrl || req.body.originalUrl || req.params.originalUrl;
  if (!originalUrl) return res.status(400).send('originalUrl is required');
  const shortUrl = await shortenUrl(originalUrl);
  res.send(`http://localhost:8080/${shortUrl}`);
};

exports.redirectToOriginal = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const original = await getOriginalUrl(shortUrl);
  if (original) {
    res.redirect(302, original);
  } else {
    res.status(404).send('Short URL not found');
  }
};
