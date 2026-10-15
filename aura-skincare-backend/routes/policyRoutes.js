const express = require("express");

const {
  getPolicies,
  checkCancellationEligibility,
} = require("../controllers/policyController");

const router = express.Router();

router.get("/", getPolicies);
router.get("/cancellation/:orderId", checkCancellationEligibility);

module.exports = router;
