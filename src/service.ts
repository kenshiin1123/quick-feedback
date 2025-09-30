import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_GEMINI_KEY });

const generateFeedback = async (prompt: {}) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a feedback based on this settings and tailor the result based on the custom prompt: ${JSON.stringify(
      prompt
    )}`,
  });
  return response;
};

export { generateFeedback };
