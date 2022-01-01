/**
 *
 * @description - Gerit challenge #1
 * @author - Shayan Zeinali
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");

console.log("environment --->", config.get("type"));

/***************Mongodb configuratrion********************/
require("./dbconfig/mongo-connection");

const port = process.env.PORT || 3031;

/***************  routes  ************************************/
const geritApi = require("./routers/gerit");

const app = express();

/***************  middlewares  ************************************/
app.use(cors());
app.use(express.static("./tmp"));
app.use(express.static("public"));
app.use(
	bodyParser.json({
		limit: "50mb",
	})
);
app.use(morgan("tiny"));

app.enable("strict routing");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Cache-Control,X-Auth-Token,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
	);

	if ("OPTIONS" === req.method) {
		res.sendStatus(204);
	} else {
		//move on
		next();
	}
});

/*************** documentation ********************/
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
// setup swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/***************   routers  ************************************/
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

app.use("/gerit", geritApi);
app.get("/", async (req, res) => {
	res.status(200).send("hello world");
});

//launch =======================================================================
app.listen(port, () => console.log(`Listening on port http://localhost:${port} ...`));

//catch 404 and forward to error handler =======================================
app.use(function (req, res, next) {
	res.status(404).json({ code: 404, msg: "not found" });
});

module.exports = app;
