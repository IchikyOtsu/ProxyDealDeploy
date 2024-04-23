const express = require("express");
const router = express.Router();
/*
router.get('/api/hello', function(req, res) {
  res.json({ data: 'Here is your data' });
});

router.post('/api/hello', function(req, res) {
  res.json({ data: 'User Created' });
});

router.put('/api/hello', function(req, res) {
  res.json({ data: 'User updated' });
});

router.delete('/api/hello', function(req, res) {
  res.json({ data: 'User Deleted' });
});
*/

router.get("/", (req, res) => {
	res.send("Hello World!");
});
module.exports = router;
