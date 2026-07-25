const express = require("express");
const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const aiLimiter = require('../middleware/rateLimiter');

// Review Code
router.post("/review", aiLimiter, authMiddleware, aiController.getReview);

// Explain Code
router.post("/explain", aiLimiter, authMiddleware, aiController.explainCode);

// Fix Code
router.post("/fix", aiLimiter, authMiddleware, aiController.fixCode);

// Optimize Code
router.post("/optimize", aiLimiter, authMiddleware, aiController.optimizeCode);

// Find Bugs
router.post("/bugs", aiLimiter, authMiddleware, aiController.findBugs);

module.exports = router;