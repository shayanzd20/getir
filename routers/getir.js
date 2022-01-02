var express = require("express");
var router = express.Router();

// middleware for time
router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

// Controllers
const { test } = require("../app/controllers/getir");

// getir api
router.post("/test", test);

module.exports = router;
