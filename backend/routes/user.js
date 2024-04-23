const express = require("express");
const router = express.Router();

const users = [
	{
		id: 1,
		username: "user1",
		email: "user1@example.com",
		age: 25,
		location: "Location 1",
		bio: "User 1 Bio",
	},
	{
		id: 2,
		username: "user2",
		email: "user2@example.com",
		age: 30,
		location: "Location 2",
		bio: "User 2 Bio",
	},
	{
		id: 3,
		username: "user3",
		email: "user3@example.com",
		age: 35,
		location: "Location 3",
		bio: "User 3 Bio",
	},
];

// Route GET pour récupérer tous les profils utilisateur
router.get("/", (req, res) => {
	res.json(users);
});

// Route GET pour récupérer un seul profil utilisateur par ID
router.get("/:id", (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id.toString() === id);
	if (user) {
		res.json(user);
	} else {
		res.status(404).send("User not found");
	}
});

module.exports = router;
