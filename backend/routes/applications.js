const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all applications
router.get("/", async (req, res) => {
	try {
		const { user_id, advert_id } = req.query;
		let query = "SELECT * FROM applications";
		const queryParams = [];

		if (user_id && advert_id) {
			query += " WHERE user_id = $1 AND advert_id = $2";
			queryParams.push(user_id, advert_id);
		}

		const { rows } = await pool.query(query, queryParams);
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single application by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM applications WHERE id = $1",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Application not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new application
router.post("/", async (req, res) => {
	try {
		const { user_id, advert_id, status } = req.body;
		const { rows } = await pool.query(
			"INSERT INTO applications (user_id, advert_id, status) VALUES ($1, $2, $3) RETURNING *",
			[user_id, advert_id, status],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) an application by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, advert_id, status } = req.body;
		const { rows } = await pool.query(
			"UPDATE applications SET user_id = $1, advert_id = $2, status = $3 WHERE id = $4 RETURNING *",
			[user_id, advert_id, status, id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Application not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE an application by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM applications WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Application not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
