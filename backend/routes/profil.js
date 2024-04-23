const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET user profile info
router.get("/", async (req, res) => {
	try {
		const userId = req.user.id; // Supposons que req.user contient les informations de l'utilisateur connecté

		const { rows } = await pool.query(
			"SELECT * FROM user_info WHERE user_id = $1",
			[userId],
		);

		if (rows.length === 0) {
			return res.status(404).send("User profile not found");
		}

		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// UPDATE user profile info
router.put("/", async (req, res) => {
	try {
		const userId = req.user.id; // Supposons que req.user contient les informations de l'utilisateur connecté
		const { first_name, last_name, email, postal_code, city, address } =
			req.body;

		const { rows } = await pool.query(
			"UPDATE user_info SET first_name = $1, last_name = $2, email = $3, postal_code = $4, city = $5, address = $6 WHERE user_id = $7 RETURNING *",
			[first_name, last_name, email, postal_code, city, address, userId],
		);

		if (rows.length === 0) {
			return res.status(404).send("User profile not found");
		}

		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
