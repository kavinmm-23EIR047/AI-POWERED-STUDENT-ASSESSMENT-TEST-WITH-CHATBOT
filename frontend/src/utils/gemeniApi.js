import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCXwcT9BbwQ1XpcgHtQNGgsGiaN_sDYJ4w"; // Replace this

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Sorry, I'm having trouble processing your request.";
  }
};
