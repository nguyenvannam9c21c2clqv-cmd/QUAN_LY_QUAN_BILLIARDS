const crypto = require("node:crypto");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_COOKIE = "billiards_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_TTL_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && (!process.env.DEMO_USERNAME || !process.env.DEMO_PASSWORD)) {
  throw new Error("DEMO_USERNAME and DEMO_PASSWORD must be set in production.");
}

const demoUsername = process.env.DEMO_USERNAME || "admin";
const demoPassword = process.env.DEMO_PASSWORD || "Billiards@123";
const passwordSalt = crypto.randomBytes(16);
const passwordHash = crypto.scryptSync(demoPassword, passwordSalt, 64);
const sessions = new Map();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getCookieValue(req, name) {
  const cookies = (req.headers.cookie || "").split(";");
  const cookie = cookies.find((item) => item.trim().startsWith(`${name}=`));
  return cookie ? cookie.trim().slice(name.length + 1) : "";
}

function getSession(req) {
  const sessionId = getCookieValue(req, SESSION_COOKIE);
  const session = sessions.get(sessionId);

  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: "Vui lòng đăng nhập để tiếp tục." });

  req.authUser = session.user;
  next();
}

function setSessionCookie(res, sessionId) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${sessionId}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`
  );
}

// Trang quản lý
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 80 ||
    password.length > 256
  ) {
    return res.status(400).json({ error: "Vui lòng nhập tài khoản và mật khẩu hợp lệ." });
  }

  const candidateHash = crypto.scryptSync(password, passwordSalt, passwordHash.length);
  const valid = safeEqual(username, demoUsername) && crypto.timingSafeEqual(candidateHash, passwordHash);
  if (!valid) return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không đúng." });

  const sessionId = crypto.randomBytes(32).toString("hex");
  const user = { username: demoUsername, displayName: "Quản trị viên" };
  sessions.set(sessionId, { user, expiresAt: Date.now() + SESSION_TTL_MS });
  setSessionCookie(res, sessionId);

  res.json({ user });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.authUser });
});

app.post("/api/auth/logout", (req, res) => {
  const sessionId = getCookieValue(req, SESSION_COOKIE);
  if (sessionId) sessions.delete(sessionId);

  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${isProduction ? "; Secure" : ""}`
  );
  res.status(204).end();
});

// API danh sách bàn (dữ liệu mẫu)
const banBilliards = [
  { id: 1, ten: "Ban 01", trangThai: "Trong" },
  { id: 2, ten: "Ban 02", trangThai: "Dang choi" },
  { id: 3, ten: "Ban 03", trangThai: "Trong" },
  { id: 4, ten: "Ban 04", trangThai: "Bao tri" }
];

app.get("/api/ban", requireAuth, (_req, res) => {
  res.json(banBilliards);
});

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
  if (!isProduction) console.log(`Tai khoan thu nghiem: ${demoUsername}`);
});
