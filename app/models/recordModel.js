var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recordSchema = new Schema({
	key: {
		type: String,
	},
	value: {
		type: String,
	},
	createdAt: { type: Date, default: Date.now() },
	_id: {
		select: false,
	},
	__v: {
		select: false,
	},
});

module.exports = mongoose.model("Record", recordSchema);
