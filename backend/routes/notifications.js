const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET notifications by user_id
router.get("/", async (req, res) => {
	try {
		const { user_id } = req.query;
		if (!user_id) {
			return res.status(400).send("User ID is required");
		}

		const { rows } = await pool.query(
			"SELECT * FROM notifications WHERE user_id = $1",
			[user_id],
		);
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single notification by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM notifications WHERE id = $1",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Notification not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new notification
router.post("/", async (req, res) => {
	try {
		const { user_id, content } = req.body;
		const { rows } = await pool.query(
			"INSERT INTO notifications (user_id, content) VALUES ($1, $2) RETURNING *",
			[user_id, content],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) a notification by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, content, is_read } = req.body;
		const { rows } = await pool.query(
			"UPDATE notifications SET user_id = $1, content = $2, is_read = $3 WHERE id = $4 RETURNING *",
			[user_id, content, is_read, id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Notification not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE a notification by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM notifications WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Notification not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
