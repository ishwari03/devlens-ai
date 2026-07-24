const Review = require("../models/review.model");

// Get all reviews of logged-in user
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .select("-code -response");

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
    });
  }
};

// Get one review
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review.",
    });
  }
};

// Delete single review by id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete review.",
    });
  }
};

// Delete all reviews for logged-in user
exports.deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: "All reviews cleared successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to clear review history.",
    });
  }
};