// app.js (backend)

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "client")));

app.use(cors());
app.use(express.json());

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

// Test route
app.get("/", (req, res) => {
	res.send("Note Taking API is running");
});

// Notları getir
app.get("/api/notes", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database error" });
	}
});

// Not ekle
app.post("/api/notes", async (req, res) => {
	const { content } = req.body;
	if (!content) return res.status(400).json({ error: "Content is required" });

	try {
		const result = await pool.query(
			"INSERT INTO notes (content) VALUES ($1) RETURNING *",
			[content]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
