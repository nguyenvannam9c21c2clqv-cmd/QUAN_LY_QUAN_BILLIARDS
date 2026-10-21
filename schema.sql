CREATE DATABASE QuanLyQuanBilliards;
GO

USE QuanLyQuanBilliards;
GO

-- 1. Bang ban bida
CREATE TABLE BanBida (
    MaBan INT PRIMARY KEY IDENTITY(1,1),
    TenBan NVARCHAR(50) NOT NULL,
    LoaiBan NVARCHAR(50),
    GiaGio DECIMAL(12,2) NOT NULL,
    TrangThai NVARCHAR(30) DEFAULT N'Con trong'
);

-- 2. Bang khach hang
CREATE TABLE KhachHang (
    MaKH INT PRIMARY KEY IDENTITY(1,1),
    HoTen NVARCHAR(100) NOT NULL,
    SoDienThoai VARCHAR(15),
    DiaChi NVARCHAR(200)
);

-- 3. Bang dat ban
CREATE TABLE DatBan (
    MaDat INT PRIMARY KEY IDENTITY(1,1),
    MaKH INT NOT NULL,
    MaBan INT NOT NULL,
    ThoiGianDat DATETIME2 NOT NULL,
    TrangThai NVARCHAR(30) DEFAULT N'Da dat',
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaBan) REFERENCES BanBida(MaBan)
);

-- 4. Bang dich vu
CREATE TABLE DichVu (
    MaDV INT PRIMARY KEY IDENTITY(1,1),
    TenDV NVARCHAR(100) NOT NULL,
    DonGia DECIMAL(12,2) NOT NULL,
    SoLuongTon INT DEFAULT 0
);

-- 5. Bang hoa don
CREATE TABLE HoaDon (
    MaHD INT PRIMARY KEY IDENTITY(1,1),
    MaKH INT NOT NULL,
    MaBan INT NOT NULL,
    GioBatDau DATETIME2 NOT NULL,
    GioKetThuc DATETIME2 NULL,
    TienBan DECIMAL(12,2) DEFAULT 0,
    TienDichVu DECIMAL(12,2) DEFAULT 0,
    TongTien AS (TienBan + TienDichVu),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaBan) REFERENCES BanBida(MaBan)
);
GO

-- Them du lieu ban bida
INSERT INTO BanBida (TenBan, LoaiBan, GiaGio, TrangThai)
VALUES
(N'Ban 01', N'Libre', 60000, N'Dang choi'),
(N'Ban 02', N'Libre', 60000, N'Con trong'),
(N'Ban 03', N'Libre', 60000, N'Con trong'),
(N'Ban VIP 01', N'VIP', 90000, N'Con trong');

-- Them khach hang
INSERT INTO KhachHang (HoTen, SoDienThoai)
VALUES
(N'Nguyen Van An', '0912345678'),
(N'Tran Van Binh', '0987654321');

-- Them dich vu
INSERT INTO DichVu (TenDV, DonGia, SoLuongTon)
VALUES
(N'Nuoc suoi', 10000, 50),
(N'Bia lanh', 20000, 30),
(N'Nuoc ngot', 15000, 40);

-- Kiem tra du lieu
SELECT * FROM BanBida;
SELECT * FROM KhachHang;
SELECT * FROM DichVu;
GO
