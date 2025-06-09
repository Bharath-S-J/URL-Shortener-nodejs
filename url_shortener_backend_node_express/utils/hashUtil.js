const crypto = require("crypto");

function generateShortHash(url) {
  const md5 = crypto.createHash("md5").update(url).digest("hex");
  const num = BigInt("0x" + md5);
  return num.toString(36).slice(0, 8);
}

module.exports = { generateShortHash };
