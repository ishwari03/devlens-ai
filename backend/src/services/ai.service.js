const axios = require("axios");

async function generateContent(systemPrompt, userPrompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      },
      {
        headers: {
         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
    throw error;
  }
}

module.exports = generateContent;