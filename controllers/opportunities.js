const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const uuidv4 = require('uuid/v4');

// @desc	Get all opportunities
// @route	GET /api/v1/opportunities
// @access	Public
exports.getOpportunities = asyncHandler(async (req, res, next) => {

	const dbClass = require("../utils/dbPromises");
	let db = new dbClass(req.db);
	
	const sql = `SELECT * FROM "Opportunity"`;
	console.log(sql);
	
	const statement = await db.preparePromisified(sql);
	
	const results = await db.statementExecPromisified(statement, []);
	
	res.status(200).json({success: true, data: results});
			
});



// @desc	Add opportunity
// @route	POST /api/v1/opportunities
// @access	Private
exports.addOpportunity = asyncHandler(async (req, res, next) => {
	
	console.log(req.body);
	req.body.id = uuidv4();

	const dbClass = require("../utils/dbPromises");
	let db = new dbClass(req.db);
	
	const sql = `INSERT INTO "Opportunity" VALUES (?)`;
	console.log(sql);
	
	const statement = await db.preparePromisified(sql);
	
	const results = await db.statementExecPromisified(statement, [JSON.stringify(req.body)]);
	
	res.status(201).json({success: true, message: "Successfully added opportunity to database..."});
	
});