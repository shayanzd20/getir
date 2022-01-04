const express = require("express");

const router = express.Router();

// middleware for time
router.use((req, res, next) => {
	console.log("Time: ", Date.now());
	next();
});

// Controllers
const { test } = require("../app/controllers/getir");

// getir api
router.post("/test", test);

module.exports = router;
