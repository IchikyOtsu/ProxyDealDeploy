const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all schedules
router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM schedules");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single schedule by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query("SELECT * FROM schedules WHERE id = $1", [
			id,
		]);
		if (rows.length === 0) {
			return res.status(404).send("Schedule not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new schedule
router.post("/", async (req, res) => {
	try {
		const { user_id, advert_id, start_time, end_time } = req.body;
		const { rows } = await pool.query(
			"INSERT INTO schedules (user_id, advert_id, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *",
			[user_id, advert_id, start_time, end_time],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) a schedule by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, advert_id, start_time, end_time } = req.body;
		const { rows } = await pool.query(
			"UPDATE schedules SET user_id = $1, advert_id = $2, start_time = $3, end_time = $4 WHERE id = $5 RETURNING *",
			[user_id, advert_id, start_time, end_time, id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Schedule not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE a schedule by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM schedules WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Schedule not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
