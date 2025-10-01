import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_GEMINI_KEY });

const generateFeedback = async ({
  settings,
  userFeedback,
  name,
}: {
  settings: object;
  userFeedback: string;
  name: string;
}) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a feedback message ${
      name.length > 0 ? "for " + name : ""
    } based on these settings: 
    ${JSON.stringify(settings)} 

    Additional user prompt to improve the feedback message: (userFeedback): 
    "${userFeedback}"
    
    Note that the Focus of Feedback is what the Audience lack.
    `,
  });

  return response;
};

export { generateFeedback };
