const express = require("express");
const router = express.Router();
const { getOpportunities, addOpportunity } = require("../controllers/opportunities");

router
	.route("/")
	.get(getOpportunities)
	.post(addOpportunity);
	
	
/* router
	.route("/:id")
	.get(getOpportunity)
	.put(updateOpportunity)
	.delete(deleteOpportunity); */
	

module.exports = router;