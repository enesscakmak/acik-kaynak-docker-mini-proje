const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Ortam değişkenleri ile DB bağlantısı
const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

// Basit health check
app.get("/", (req, res) => {
	res.send("Note Taking API is running");
});

// Notları listele
app.get("/notes", async (req, res) => {
	const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
	res.json(result.rows);
});

// Yeni not ekle
app.post("/notes", async (req, res) => {
	const { content } = req.body;
	if (!content) return res.status(400).json({ error: "Content required" });
	const result = await pool.query(
		"INSERT INTO notes(content) VALUES($1) RETURNING *",
		[content]
	);
	res.status(201).json(result.rows[0]);
});

// Statik frontend dosyalarını sun
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
