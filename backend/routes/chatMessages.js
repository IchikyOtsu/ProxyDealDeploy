const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all chat messages
router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM chat_messages");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single chat message by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM chat_messages WHERE id = $1",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Chat message not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new chat message
router.post("/", async (req, res) => {
	try {
		const { sender_id, recipient_id, content } = req.body;
		const { rows } = await pool.query(
			"INSERT INTO chat_messages (sender_id, recipient_id, content) VALUES ($1, $2, $3) RETURNING *",
			[sender_id, recipient_id, content],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) a chat message by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { sender_id, recipient_id, content } = req.body;
		const { rows } = await pool.query(
			"UPDATE chat_messages SET sender_id = $1, recipient_id = $2, content = $3 WHERE id = $4 RETURNING *",
			[sender_id, recipient_id, content, id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Chat message not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE a chat message by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM chat_messages WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Chat message not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
