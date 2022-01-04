const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordSchema = new Schema({
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
