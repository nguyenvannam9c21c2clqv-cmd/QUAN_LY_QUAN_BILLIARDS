const crypto = require("node:crypto");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { openAccountDatabase } = require("./account-store");
const { createPasswordHash, verifyPassword } = require("./passwords");

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_COOKIE = "billiards_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_TTL_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
const isProduction = process.env.NODE_ENV === "production";
const roles = new Set(["admin", "manager", "staff"]);
const sessions = new Map();
const db = openAccountDatabase();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

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

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.authUser || !allowedRoles.includes(req.authUser.role)) {
      return res.status(403).json({ error: "Bạn không có quyền thực hiện thao tác này." });
    }

    next();
  };
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function setSessionCookie(res, sessionId) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${sessionId}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`
  );
}

function clearSessionCookie(res) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secure}`
  );
}

function invalidateUserSessions(userId) {
  for (const [sessionId, session] of sessions) {
    if (session.user.id === userId) sessions.delete(sessionId);
  }
}

function refreshUserSessions(user) {
  for (const session of sessions.values()) {
    if (session.user.id === user.id) session.user = user;
  }
}

function accountUser(row) {
  return {
    id: row.id,
    username: row.username,
    displayName: row.fullName,
    role: row.role
  };
}

function formatAccount(row) {
  return {
    id: row.id,
    username: row.username,
    fullName: row.fullName,
    role: row.role,
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt
  };
}

function getAccountById(id) {
  return db.prepare(`
    SELECT id, username, full_name AS fullName, role,
           is_active AS isActive, created_at AS createdAt
    FROM employee_accounts
    WHERE id = ?
  `).get(id);
}

function isValidUsername(username) {
  return typeof username === "string" && /^[a-zA-Z0-9._-]{3,80}$/.test(username);
}

function isValidFullName(fullName) {
  return typeof fullName === "string" && fullName.trim().length > 0 && fullName.trim().length <= 100;
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8 && password.length <= 128;
}

function isValidRole(role) {
  return typeof role === "string" && roles.has(role);
}

function sendAccountError(res, error) {
  if (error && error.message.startsWith("UNIQUE constraint failed: employee_accounts.username")) {
    return res.status(409).json({ error: "Tên đăng nhập đã được sử dụng." });
  }

  throw error;
}

function rollbackTransaction() {
  try {
    db.exec("ROLLBACK");
  } catch (error) {
    console.error("Không thể hoàn tác thao tác tài khoản:", error);
  }
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/api/auth/login", asyncRoute(async (req, res) => {
  const { username, password } = req.body || {};
  if (!isValidUsername(username) || typeof password !== "string" || password.length > 128) {
    return res.status(400).json({ error: "Vui lòng nhập tài khoản và mật khẩu hợp lệ." });
  }

  const row = db.prepare(`
    SELECT id, username, full_name AS fullName, password_hash AS passwordHash, role
    FROM employee_accounts
    WHERE username = ? AND is_active = 1
  `).get(username);
  if (!row || !verifyPassword(password, row.passwordHash)) {
    return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không đúng." });
  }

  const sessionId = crypto.randomBytes(32).toString("hex");
  const user = accountUser(row);
  sessions.set(sessionId, { user, expiresAt: Date.now() + SESSION_TTL_MS });
  setSessionCookie(res, sessionId);
  res.json({ user });
}));

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.authUser });
});

app.post("/api/auth/logout", (req, res) => {
  const sessionId = getCookieValue(req, SESSION_COOKIE);
  if (sessionId) sessions.delete(sessionId);
  clearSessionCookie(res);
  res.status(204).end();
});

app.get("/api/accounts", requireAuth, requireRole("admin"), asyncRoute(async (_req, res) => {
  const rows = db.prepare(`
    SELECT id, username, full_name AS fullName, role,
           is_active AS isActive, created_at AS createdAt
    FROM employee_accounts
    ORDER BY full_name, username
  `).all();
  res.json(rows.map(formatAccount));
}));

app.post("/api/accounts", requireAuth, requireRole("admin"), asyncRoute(async (req, res) => {
  const { username, fullName, password, role } = req.body || {};
  if (!isValidUsername(username)) {
    return res.status(400).json({ error: "Tên tài khoản cần dài 3–80 ký tự, chỉ gồm chữ, số, dấu chấm, gạch dưới hoặc gạch ngang." });
  }
  if (!isValidFullName(fullName)) return res.status(400).json({ error: "Vui lòng nhập họ tên (tối đa 100 ký tự)." });
  if (!isValidPassword(password)) return res.status(400).json({ error: "Mật khẩu phải có từ 8 đến 128 ký tự." });
  if (!isValidRole(role)) return res.status(400).json({ error: "Vai trò không hợp lệ." });

  try {
    const result = db.prepare(`
      INSERT INTO employee_accounts (username, full_name, password_hash, role)
      VALUES (?, ?, ?, ?)
    `).run(username, fullName.trim(), createPasswordHash(password), role);
    res.status(201).json(formatAccount(getAccountById(Number(result.lastInsertRowid))));
  } catch (error) {
    return sendAccountError(res, error);
  }
}));

app.put("/api/accounts/:id", requireAuth, requireRole("admin"), asyncRoute(async (req, res) => {
  const id = Number(req.params.id);
  const { fullName, role, isActive, password } = req.body || {};
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: "Mã tài khoản không hợp lệ." });
  if (fullName !== undefined && !isValidFullName(fullName)) {
    return res.status(400).json({ error: "Họ tên không hợp lệ." });
  }
  if (role !== undefined && !isValidRole(role)) return res.status(400).json({ error: "Vai trò không hợp lệ." });
  if (isActive !== undefined && typeof isActive !== "boolean") {
    return res.status(400).json({ error: "Trạng thái tài khoản không hợp lệ." });
  }
  if (password !== undefined && password !== "" && !isValidPassword(password)) {
    return res.status(400).json({ error: "Mật khẩu mới phải có từ 8 đến 128 ký tự." });
  }
  if (fullName === undefined && role === undefined && isActive === undefined && !password) {
    return res.status(400).json({ error: "Không có thông tin nào để cập nhật." });
  }

  let transactionOpen = false;
  try {
    db.exec("BEGIN IMMEDIATE");
    transactionOpen = true;
    const current = db.prepare(`
      SELECT id, role, is_active AS isActive
      FROM employee_accounts
      WHERE id = ?
    `).get(id);
    if (!current) {
      rollbackTransaction();
      transactionOpen = false;
      return res.status(404).json({ error: "Không tìm thấy tài khoản." });
    }

    const nextRole = role === undefined ? current.role : role;
    const nextActive = isActive === undefined ? Boolean(current.isActive) : isActive;
    if (req.authUser.id === id && (nextRole !== "admin" || !nextActive)) {
      rollbackTransaction();
      transactionOpen = false;
      return res.status(409).json({ error: "Không thể tự hạ quyền hoặc vô hiệu hóa tài khoản đang đăng nhập." });
    }
    if (current.role === "admin" && current.isActive && (nextRole !== "admin" || !nextActive)) {
      const count = db.prepare(`
        SELECT COUNT(*) AS total
        FROM employee_accounts
        WHERE role = 'admin' AND is_active = 1
      `).get().total;
      if (count <= 1) {
        rollbackTransaction();
        transactionOpen = false;
        return res.status(409).json({ error: "Phải giữ lại ít nhất một quản trị viên đang hoạt động." });
      }
    }

    db.prepare(`
      UPDATE employee_accounts
      SET full_name = COALESCE(?, full_name),
          role = ?,
          is_active = ?,
          password_hash = COALESCE(?, password_hash)
      WHERE id = ?
    `).run(
      fullName === undefined ? null : fullName.trim(),
      nextRole,
      nextActive ? 1 : 0,
      password ? createPasswordHash(password) : null,
      id
    );
    db.exec("COMMIT");
    transactionOpen = false;

    const updatedAccount = formatAccount(getAccountById(id));
    if (password || current.role !== nextRole || Boolean(current.isActive) !== nextActive) {
      invalidateUserSessions(id);
    } else {
      refreshUserSessions(accountUser({
        id: updatedAccount.id,
        username: updatedAccount.username,
        fullName: updatedAccount.fullName,
        role: updatedAccount.role
      }));
    }
    res.json(updatedAccount);
  } catch (error) {
    if (transactionOpen) rollbackTransaction();
    return sendAccountError(res, error);
  }
}));

app.delete("/api/accounts/:id", requireAuth, requireRole("admin"), asyncRoute(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: "Mã tài khoản không hợp lệ." });
  if (req.authUser.id === id) return res.status(409).json({ error: "Không thể xóa tài khoản đang đăng nhập." });

  let transactionOpen = false;
  try {
    db.exec("BEGIN IMMEDIATE");
    transactionOpen = true;
    const current = db.prepare(`
      SELECT id, role, is_active AS isActive
      FROM employee_accounts
      WHERE id = ?
    `).get(id);
    if (!current) {
      rollbackTransaction();
      transactionOpen = false;
      return res.status(404).json({ error: "Không tìm thấy tài khoản." });
    }

    if (current.role === "admin" && current.isActive) {
      const count = db.prepare(`
        SELECT COUNT(*) AS total
        FROM employee_accounts
        WHERE role = 'admin' AND is_active = 1
      `).get().total;
      if (count <= 1) {
        rollbackTransaction();
        transactionOpen = false;
        return res.status(409).json({ error: "Không thể xóa quản trị viên đang hoạt động cuối cùng." });
      }
    }

    db.prepare("DELETE FROM employee_accounts WHERE id = ?").run(id);
    db.exec("COMMIT");
    transactionOpen = false;
    invalidateUserSessions(id);
    res.status(204).end();
  } catch (error) {
    if (transactionOpen) rollbackTransaction();
    return sendAccountError(res, error);
  }
}));

const banBilliards = [
  { id: 1, ten: "Ban 01", trangThai: "Trong" },
  { id: 2, ten: "Ban 02", trangThai: "Dang choi" },
  { id: 3, ten: "Ban 03", trangThai: "Trong" },
  { id: 4, ten: "Ban 04", trangThai: "Bao tri" }
];

app.get("/api/ban", requireAuth, (_req, res) => {
  res.json(banBilliards);
});

app.use((error, _req, res, _next) => {
  console.error("Lỗi xử lý yêu cầu:", error);
  if (res.headersSent) return;
  res.status(500).json({ error: "Có lỗi máy chủ. Hãy kiểm tra nhật ký server." });
});

process.once("exit", () => db.close());

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
  console.log(`Cơ sở dữ liệu tài khoản: ${process.env.ACCOUNT_DATABASE_PATH || "data/accounts.sqlite"}`);
});
