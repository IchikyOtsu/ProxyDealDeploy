const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all adverts
router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM adverts");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single advert by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query("SELECT * FROM adverts WHERE id = $1", [
			id,
		]);
		if (rows.length === 0) {
			return res.status(404).send("Advert not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET adverts by enterprise id
router.get("/enterprises/:enterpriseId", async (req, res) => {
	try {
		const { enterpriseId } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM adverts WHERE enterprise_id = $1",
			[enterpriseId],
		);
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET accepted adverts for a user
router.get("/accepted-adverts/:userId", async (req, res) => {
	try {
		const userId = Number.parseInt(req.params.userId);

		const { rows } = await pool.query(
			`
            SELECT a.id, a.title, a.start_date, a.end_date
            FROM adverts a
            INNER JOIN applications ap ON a.id = ap.advert_id
            WHERE ap.user_id = $1 AND ap.status = 'pending'
            `,
			[userId],
		);

		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new advert
router.post("/", async (req, res) => {
	try {
		const {
			enterprise_id,
			title,
			description,
			location,
			start_date,
			end_date,
			salary,
		} = req.body;
		const { rows } = await pool.query(
			"INSERT INTO adverts (enterprise_id, title, description, location, start_date, end_date, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
			[
				enterprise_id,
				title,
				description,
				location,
				start_date,
				end_date,
				salary,
			],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) an advert by id
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const {
			enterprise_id,
			title,
			description,
			location,
			start_date,
			end_date,
			salary,
		} = req.body;
		const { rows } = await pool.query(
			"UPDATE adverts SET enterprise_id = $1, title = $2, description = $3, location = $4, start_date = $5, end_date = $6, salary = $7 WHERE id = $8 RETURNING *",
			[
				enterprise_id,
				title,
				description,
				location,
				start_date,
				end_date,
				salary,
				id,
			],
		);
		if (rows.length === 0) {
			return res.status(404).send("Advert not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// DELETE an advert by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"DELETE FROM adverts WHERE id = $1 RETURNING *",
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).send("Advert not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
