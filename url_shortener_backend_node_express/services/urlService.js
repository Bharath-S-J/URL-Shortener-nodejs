const db = require("../db/pgPool");
const redis = require("./redisService");
const { generateShortHash } = require("../utils/hashUtil");

const TTL = 60 * 60 * 24; // 1 day in seconds

async function shortenUrl(originalUrl) {
  const cachedShortUrl = await redis.get(originalUrl);
  if (cachedShortUrl) return cachedShortUrl;

  const dbCheck = await db.query(
    "SELECT short_url FROM short_urls WHERE original_url = $1",
    [originalUrl]
  );
  if (dbCheck.rowCount > 0) {
    const shortUrl = dbCheck.rows[0].short_url;
    await redis.setEx(originalUrl, TTL, shortUrl);
    return shortUrl;
  }

  const shortUrl = generateShortHash(originalUrl);

  await db.query(
    "INSERT INTO short_urls(original_url, short_url) VALUES($1, $2) ON CONFLICT DO NOTHING",
    [originalUrl, shortUrl]
  );

  await redis.setEx(originalUrl, TTL, shortUrl);
  await redis.setEx(shortUrl, TTL, originalUrl);

  return shortUrl;
}

async function getOriginalUrl(shortUrl) {
  const cachedOriginalUrl = await redis.get(shortUrl);
  if (cachedOriginalUrl) return cachedOriginalUrl;

  const dbResult = await db.query(
    "SELECT original_url FROM short_urls WHERE short_url = $1",
    [shortUrl]
  );

  if (dbResult.rowCount > 0) {
    const originalUrl = dbResult.rows[0].original_url;
    await redis.setEx(shortUrl, TTL, originalUrl);
    return originalUrl;
  }

  return null;
}

module.exports = { shortenUrl, getOriginalUrl };
