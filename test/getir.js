let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../getir-server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Test API", () => {
	/**
	 * Test the POST route
	 */
	describe("POST /getir/test", () => {
		it("It should POST payload and get valid records", (done) => {
			const body = {
				startDate: "2016-11-27",
				endDate: "2016-11-30",
				minCount: 50,
				maxCount: 3000,
			};

			chai.request(server)
				.post(`/getir/test`)
				.send(body)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a("object");
					response.body.should.have.property("code").that.eql(0);
					response.body.should.have.property("msg").that.eql("Success");
					done();
				});
		});
	});

	/**
	 * Test the GET route as invalid route
	 */

	describe("GET /getir/test with invalid route", () => {
		it("It should GET 404 error ", (done) => {
			chai.request(server)
				.get("/getir/test")
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});
	});

	/**
	 * Test the invalid params
	 */
	describe("POST /getir/test with invalid params", () => {
		it("It should GET error of 400", (done) => {
			const body = {
				startDate: "2016-11",
				endDate: "2016-11",
				minCount: 50,
				maxCount: 3000,
			};

			chai.request(server)
				.post(`/getir/test`)
				.send(body)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a("object");
					response.body.should.have.property("code").that.eql(400);
					response.body.should.have.property("msg").that.eql("bad inputs");
					done();
				});
		});
	});
	it("It should GET empty records", (done) => {
		const body = {
			startDate: "2016-11-27",
			endDate: "2016-11-30",
			minCount: 5000,
			maxCount: 6000,
		};

		chai.request(server)
			.post(`/getir/test`)
			.send(body)
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				response.body.should.have.property("code").that.eql(0);
				response.body.should.have.property("msg").that.eql("Success");
				response.body.should.have.property("records").that.eql([]);
				done();
			});
	});
});
