import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCXwcT9BbwQ1XpcgHtQNGgsGiaN_sDYJ4w";

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: message }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't process that. Please try again.";
  }
};
