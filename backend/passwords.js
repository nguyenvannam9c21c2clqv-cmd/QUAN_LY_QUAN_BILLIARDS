const crypto = require("node:crypto");

function createPasswordHash(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPassword(password, storedHash) {
  const [saltHex, hashHex] = String(storedHash || "").split(":");
  if (!saltHex || !hashHex || !/^[a-f0-9]+$/i.test(saltHex) || !/^[a-f0-9]+$/i.test(hashHex)) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const expectedHash = Buffer.from(hashHex, "hex");
  if (salt.length !== 16 || expectedHash.length !== 64) return false;

  const actualHash = crypto.scryptSync(password, salt, expectedHash.length);
  return crypto.timingSafeEqual(actualHash, expectedHash);
}

module.exports = { createPasswordHash, verifyPassword };
