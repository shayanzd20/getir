const config = require("config");
module.exports = {
	mongodb: {
		url: config.get("mongodb.url"),
	},
	// any other database config
};
