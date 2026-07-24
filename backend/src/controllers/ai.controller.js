const aiService = require('../services/ai.service');
const Review = require("../models/review.model");

const reviewPrompt = require("../prompts/review.prompt");
const explainPrompt = require("../prompts/explain.prompt");
const fixPrompt = require("../prompts/fix.prompt");
const optimizePrompt = require("../prompts/optimize.prompt");
const bugsPrompt = require("../prompts/bugs.prompt");

async function handleRequest(req, res, systemPrompt,action) {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required.",
    });
  }

  try {
    const prompt = `Programming Language: ${language}\n\n${code}`;
    const response = await aiService(systemPrompt, prompt);

    //save review in mongodb
    await Review.create({
      user: req.user.id,
      language,
      action,
      code,
      response,
    });


    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong with the AI Service.",
      error: error.message,
    });
  }
}

module.exports.getReview = (req, res) =>
  handleRequest(req, res, reviewPrompt, "review");

module.exports.explainCode = (req, res) =>
  handleRequest(req, res, explainPrompt, "explain");

module.exports.fixCode = (req, res) =>
  handleRequest(req, res, fixPrompt, "fix");

module.exports.optimizeCode = (req, res) =>
  handleRequest(req, res, optimizePrompt, "optimize");

module.exports.findBugs = (req, res) =>
  handleRequest(req, res, bugsPrompt, "bugs");