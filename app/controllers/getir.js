"use strict";
const { Validator } = require("node-input-validator");

// models
const { record } = require("../models/index");

module.exports = {
	test: async (req, res) => {
		let inputs = {};

		// we can add body , query and other parameters here to validate
		Object.assign(inputs, req.body);

		let isValid = await new Validator(inputs, {
			minCount: "required|integer",
			maxCount: "required|integer",
			startDate: "required|dateFormat:YYYY-MM-DD",
			endDate: "required|dateFormat:YYYY-MM-DD",
		}).check();
		if (!isValid) return res.status(400).json({ code: 400, msg: "bad inputs", inputs });

		let { minCount, maxCount, startDate, endDate } = inputs;

		record
			.aggregate()
			.match({ createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } })
			.project({
				key: 1,
				createdAt: 1,
				_id: 0,
				totalCount: {
					$sum: "$counts",
				},
			})
			.exec((err, posts) => {
				if (err) throw err;
				if (posts) {
					let filtered = posts.filter((x) => +minCount < +x.totalCount && +x.totalCount < +maxCount);
					res.status(200).json({ code: 0, msg: "Success", records: filtered });
				} else {
					res.status(404).json({ code: 404, msg: "not found", records: [] });
				}
			});
	},
};
