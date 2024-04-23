const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all enterprises
router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM enterprises");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single enterprise by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM enterprises WHERE id = $1",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Enterprise not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new enterprise
router.post("/", async (req, res) => {
	try {
		const { user_id, name, description, logo_url, website_url } = req.body;
		const { rows } = await pool.query(
			"INSERT INTO enterprises (user_id, name, description, logo_url, website_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[user_id, name, description, logo_url, website_url],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) an enterprise by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, name, description, logo_url, website_url } = req.body;
		const { rows } = await pool.query(
			"UPDATE enterprises SET user_id = $1, name = $2, description = $3, logo_url = $4, website_url = $5 WHERE id = $6 RETURNING *",
			[user_id, name, description, logo_url, website_url, id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Enterprise not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE an enterprise by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM enterprises WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Enterprise not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
