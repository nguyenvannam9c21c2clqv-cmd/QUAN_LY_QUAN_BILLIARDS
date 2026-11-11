
"""
BOOTSTRAP.PY
Khởi tạo hệ thống quản lý quán Billiards
"""

import os
import sys
import sqlite3
import logging
from pathlib import Path
from datetime import datetime

# ==========================================
# 1. CẤU HÌNH DỰ ÁN
# ==========================================

PROJECT_NAME = "Billiards Management System"
BASE_DIR = Path(__file__).resolve().parent

DATABASE_DIR = BASE_DIR / "database"
DATABASE_FILE = DATABASE_DIR / "billiards.db"

LOG_DIR = BASE_DIR / "logs"
LOG_FILE = LOG_DIR / "system.log"

# ==========================================
# 2. KHỞI TẠO LOGGING
# ==========================================

def setup_logging():
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(LOG_FILE, encoding="utf-8"),
            logging.StreamHandler(sys.stdout)
        ]
    )

# ==========================================
# 3. TẠO CẤU TRÚC THƯ MỤC
# ==========================================

def create_directories():
    directories = [
        DATABASE_DIR,
        LOG_DIR,
        BASE_DIR / "src",
        BASE_DIR / "src" / "models",
        BASE_DIR / "src" / "services",
        BASE_DIR / "src" / "routes",
        BASE_DIR / "src" / "utils",
        BASE_DIR / "static",
        BASE_DIR / "templates",
        BASE_DIR / "tests",
    ]

    for directory in directories:
        directory.mkdir(parents=True, exist_ok=True)

    logging.info("Đã khởi tạo cấu trúc thư mục.")

# ==========================================
# 4. KHỞI TẠO DATABASE
# ==========================================

def initialize_database():
    connection = sqlite3.connect(DATABASE_FILE)

    try:
        cursor = connection.cursor()

        # Bảng quản lý bàn
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tables (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                table_name TEXT NOT NULL UNIQUE,
                table_type TEXT DEFAULT 'Pool',
                hourly_rate REAL NOT NULL DEFAULT 50000,
                status TEXT NOT NULL DEFAULT 'available'
            )
        """)

        # Bảng khách hàng
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                phone TEXT UNIQUE,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Bảng nhân viên
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'staff',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Bảng phiên chơi
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                table_id INTEGER NOT NULL,
                customer_id INTEGER,
                start_time TEXT NOT NULL,
                end_time TEXT,
                total_minutes INTEGER DEFAULT 0,
                total_amount REAL DEFAULT 0,
                status TEXT DEFAULT 'playing',
                FOREIGN KEY (table_id) REFERENCES tables(id),
                FOREIGN KEY (customer_id) REFERENCES customers(id)
            )
        """)

        # Bảng hóa đơn
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER,
                total_amount REAL NOT NULL DEFAULT 0,
                payment_method TEXT DEFAULT 'cash',
                payment_status TEXT DEFAULT 'unpaid',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES sessions(id)
            )
        """)

        connection.commit()
        logging.info("Khởi tạo cơ sở dữ liệu thành công.")

    except sqlite3.Error:
        connection.rollback()
        logging.exception("Lỗi khởi tạo cơ sở dữ liệu.")
        raise

    finally:
        connection.close()

# ==========================================
# 5. KIỂM TRA MÔI TRƯỜNG
# ==========================================

def check_environment():
    logging.info("Python version: %s", sys.version.split()[0])
    logging.info("Project directory: %s", BASE_DIR)

    if not os.access(BASE_DIR, os.W_OK):
        raise PermissionError("Không có quyền ghi vào thư mục dự án.")

# ==========================================
# 6. KHỞI ĐỘNG HỆ THỐNG
# ==========================================

def bootstrap():
    setup_logging()

    logging.info("=" * 50)
    logging.info("KHỞI ĐỘNG %s", PROJECT_NAME)
    logging.info("=" * 50)

    check_environment()
    create_directories()
    initialize_database()

    logging.info("HỆ THỐNG ĐÃ SẴN SÀNG!")
    logging.info("Database: %s", DATABASE_FILE)

# ==========================================
# 7. MAIN
# ==========================================

if __name__ == "__main__":
    try:
        bootstrap()
    except Exception:
        logging.exception("Không thể khởi động hệ thống.")
        sys.exit(1)
