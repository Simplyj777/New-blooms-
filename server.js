const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "readings.json");

app.use(cors());
app.use(express.json());

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readData() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.json({
    message: "New Bloom backend is running",
    routes: [
      "GET /",
      "GET /api/health",
      "GET /api/readings",
      "POST /api/readings"
    ]
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "new-bloom-backend" });
});

app.get("/api/readings", (req, res) => {
  const readings = readData();
  res.json(readings);
});

app.post("/api/readings", (req, res) => {
  const { user, reading } = req.body;

  if (!user?.name || !user?.email || !reading) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const readings = readData();
  const record = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    user,
    reading
  };

  readings.unshift(record);
  writeData(readings);

  res.status(201).json({
    message: "Reading saved successfully",
    id: record.id
  });
});

app.listen(PORT, () => {
  console.log(`New Bloom backend running on http://localhost:${PORT}`);
});
