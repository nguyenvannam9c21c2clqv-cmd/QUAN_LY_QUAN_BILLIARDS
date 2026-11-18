require("dotenv").config();

const { openAccountDatabase } = require("./account-store");
const { createPasswordHash } = require("./passwords");

const username = process.env.INITIAL_ADMIN_USERNAME || "admin";
const fullName = process.env.INITIAL_ADMIN_FULL_NAME || "Quản trị viên";
const password = process.env.INITIAL_ADMIN_PASSWORD;

function createAdmin() {
  if (!/^[a-zA-Z0-9._-]{3,80}$/.test(username)) {
    throw new Error("INITIAL_ADMIN_USERNAME phải dài 3–80 ký tự và chỉ gồm chữ, số, dấu chấm, gạch dưới hoặc gạch ngang.");
  }
  if (!fullName.trim() || fullName.length > 100) {
    throw new Error("INITIAL_ADMIN_FULL_NAME phải có từ 1 đến 100 ký tự.");
  }
  if (!password || password.length < 12 || password.length > 128) {
    throw new Error("Hãy đặt INITIAL_ADMIN_PASSWORD trong .env (từ 12 đến 128 ký tự) trước khi tạo quản trị viên.");
  }

  const db = openAccountDatabase();
  try {
    const existing = db.prepare(`
      SELECT COUNT(*) AS total
      FROM employee_accounts
      WHERE role = 'admin' AND is_active = 1
    `).get();
    if (existing.total > 0) {
      throw new Error("Đã có quản trị viên đang hoạt động. Không tạo tài khoản khởi tạo nữa.");
    }

    db.prepare(`
      INSERT INTO employee_accounts (username, full_name, password_hash, role)
      VALUES (?, ?, ?, 'admin')
    `).run(username, fullName.trim(), createPasswordHash(password));
    console.log(`Đã tạo quản trị viên "${username}". Hãy xóa INITIAL_ADMIN_PASSWORD khỏi .env.`);
  } finally {
    db.close();
  }
}

try {
  createAdmin();
} catch (error) {
  console.error("Không thể tạo quản trị viên:", error.message);
  process.exitCode = 1;
}
