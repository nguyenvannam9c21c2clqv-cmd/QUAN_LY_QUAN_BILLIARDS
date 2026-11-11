
"""
TAO_TAI_KHOAN.PY
Quản lý tạo tài khoản cho hệ thống Billiards
"""

import sqlite3
import hashlib
import secrets
import getpass
from pathlib import Path

# =====================================
# CẤU HÌNH
# =====================================

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "database" / "billiards.db"

ROLES = {
    "1": "admin",
    "2": "manager",
    "3": "staff"
}


# =====================================
# MÃ HÓA MẬT KHẨU
# =====================================

def hash_password(password):
    salt = secrets.token_bytes(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        600000
    )

    return salt.hex() + ":" + password_hash.hex()


# =====================================
# TẠO TÀI KHOẢN
# =====================================

def create_account():
    if not DATABASE.exists():
        print("Không tìm thấy database. Hãy chạy bootstrap.py trước.")
        return

    print("\n===== TẠO TÀI KHOẢN =====")

    full_name = input("Họ và tên: ").strip()
    username = input("Tên đăng nhập: ").strip()

    if not full_name or not username:
        print("Thông tin không được để trống!")
        return

    print("\nChọn quyền:")
    print("1. Quản trị viên")
    print("2. Quản lý")
    print("3. Nhân viên")

    role_choice = input("Lựa chọn: ").strip()

    if role_choice not in ROLES:
        print("Quyền không hợp lệ!")
        return

    password = getpass.getpass("Mật khẩu: ")
    confirm = getpass.getpass("Nhập lại mật khẩu: ")

    if len(password) < 8:
        print("Mật khẩu phải có ít nhất 8 ký tự!")
        return

    if password != confirm:
        print("Mật khẩu không khớp!")
        return

    password_hash = hash_password(password)
    role = ROLES[role_choice]

    try:
        with sqlite3.connect(DATABASE) as conn:
            conn.execute("PRAGMA foreign_keys = ON")

            conn.execute("""
                INSERT INTO employees (
                    full_name,
                    username,
                    password_hash,
                    role
                )
                VALUES (?, ?, ?, ?)
            """, (
                full_name,
                username,
                password_hash,
                role
            ))

        print("\nTạo tài khoản thành công!")
        print("Tên đăng nhập:", username)
        print("Vai trò:", role)

    except sqlite3.IntegrityError:
        print("Tên đăng nhập đã tồn tại!")

    except sqlite3.Error as error:
        print("Lỗi database:", error)


# =====================================
# CHƯƠNG TRÌNH CHÍNH
# =====================================

if __name__ == "__main__":
    try:
        create_account()
    except KeyboardInterrupt:
        print("\nĐã hủy thao tác.")
