const express = require("express");
const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const aiLimiter = require('../middleware/rateLimiter');

// Apply aiLimiter to your review/explain/fix endpoints
router.post('/review', aiLimiter, aiController.getReview);

// Review Code
router.post("/review", authMiddleware, aiController.getReview);

// Explain Code
router.post("/explain", authMiddleware, aiController.explainCode);

// Fix Code
router.post("/fix", authMiddleware, aiController.fixCode);

// Optimize Code
router.post("/optimize", authMiddleware, aiController.optimizeCode);

// Find Bugs
router.post("/bugs", authMiddleware, aiController.findBugs);

module.exports = router;