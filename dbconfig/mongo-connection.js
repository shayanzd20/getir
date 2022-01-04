const mongoose = require("mongoose");
const config = require("config");

const option = {
	autoIndex: false,
	poolSize: 10,
	bufferMaxEntries: 0,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
// configuration ===============================================================

const mongoUrl = `mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.pass")}@challenge-xzwqd.mongodb.net/${config.get("mongodb.db")}?retryWrites=true`;
mongoose.connect(mongoUrl, option).catch((err) => {
	// mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true
	console.log("Could not connect to mongoDB", err);
	console.log("Could not connect to mongoDB", err.message);
});

const db = mongoose.connection;
db.on("error", (err) => {
	console.log("err in :", err);
	console.log("err.message in :", err.message);
});

db.once("open", () => {
	console.log("connected to mongodb database");
});

db.on("disconnected", () => {
	console.log("mongodb database disconnected");
	console.log("mongodb database reconnecting ...");
	// Reconnect on timeout
	mongoose.connect(mongoUrl);
});
