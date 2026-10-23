const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cau hinh middleware
app.use(cors());
app.use(express.json());

// Trang chu API
app.get("/", (req, res) => {
  res.send("Backend quan ly quan Billiards dang hoat dong!");
});

// API danh sach ban Billiards (du lieu mau)
const banBilliards = [
  { id: 1, ten: "Ban 01", trangThai: "Trong" },
  { id: 2, ten: "Ban 02", trangThai: "Dang choi" },
  { id: 3, ten: "Ban 03", trangThai: "Trong" },
  { id: 4, ten: "Ban 04", trangThai: "Bao tri" }
];

app.get("/api/ban", (req, res) => {
  res.json(banBilliards);
});

// Khoi dong server
app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
});
