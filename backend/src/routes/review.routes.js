const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");

// All routes require login
router.use(authMiddleware);

// Delete all reviews of logged-in user
router.delete("/", reviewController.deleteAllReviews);

// Get all reviews
router.get("/", reviewController.getReviews);

// Get one review
router.get("/:id", reviewController.getReviewById);

// Delete single review by id
router.delete("/:id", reviewController.deleteReview);
module.exports = router;