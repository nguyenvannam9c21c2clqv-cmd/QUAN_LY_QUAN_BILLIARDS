const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Cau hinh SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "localhost",
  database: "QuanLyQuanBilliards",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// API kiem tra server
app.get("/", (req, res) => {
  res.json({
    message: "Backend quan ly Billiards dang hoat dong"
  });
});

// API lay danh sach ban bida
app.get("/api/ban", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(
      "SELECT * FROM BanBida"
    );

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Khong the lay danh sach ban"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});
