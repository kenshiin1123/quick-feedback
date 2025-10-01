// aiFeedback.ts
import { GoogleGenAI } from "@google/genai";

/**
 * Options taken from your UI options (keeps typesafe choices).
 * Adjust these unions if you later add/remove options.
 */
export type Audience = "Child" | "Teenager" | "Adult" | "Senior" | "All Ages";
export type EnglishLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Fluent / Native"
  | "Mixed Levels";
export type Tone =
  | "Professional"
  | "Casual/Friendly"
  | "Supportive"
  | "Constructive"
  | "Neutral";
export type FocusOfFeedback =
  | "Grammar & Language Use"
  | "Content & Ideas"
  | "Effort & Improvement"
  | "Accuracy & Details"
  | "Clarity & Organization";
export type LengthOption = "Short" | "Medium" | "Detailed";
export type FormatOption = "Paragraph" | "Bullet Points" | "One-liner";

export type Settings = {
  Audience: Audience;
  "English Level": EnglishLevel;
  Tone: Tone;
  "Focus of Feedback": FocusOfFeedback;
  Length: LengthOption;
  Format: FormatOption;
};

const DEFAULT_SETTINGS: Settings = {
  Audience: "All Ages",
  "English Level": "Mixed Levels",
  Tone: "Supportive",
  "Focus of Feedback": "Clarity & Organization",
  Length: "Medium",
  Format: "Paragraph",
};

/** initialize SDK */
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_GEMINI_KEY });

/** safely format settings for the prompt */
const formatSettingsForPrompt = (settings: Settings) =>
  Object.entries(settings)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

/** robustly extract the text content from Gemini response shapes */
const extractTextFromResponse = (resp: any): string => {
  // try multiple common shapes defensively
  return (
    resp?.text ??
    resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
    resp?.candidates?.[0]?.content?.text ??
    resp?.output?.[0]?.content?.text ??
    ""
  );
};

/**
 * Main function: returns the generated feedback as a plain string.
 * Throws on network/SDK errors so callers can handle UI state properly.
 */
export const generateFeedback = async ({
  settings,
  userFeedback,
  name,
}: {
  settings?: Partial<Settings>;
  userFeedback: string;
  name?: string;
}): Promise<string> => {
  // merge with defaults and narrow to our Settings type
  const merged: Settings = {
    ...DEFAULT_SETTINGS,
    ...(settings || {}),
  } as Settings;

  // sanitize small things
  const safeName = (name || "").trim();
  const safeUserFeedback = (userFeedback || "").trim().slice(0, 2000); // limit length for safety

  // Build a deterministic, instruction-rich prompt
  const prompt = [
    `You are an expert feedback generator. Produce a single feedback message${
      safeName ? ` for "${safeName}"` : ""
    }.`,
    "",
    "Context (DO NOT mention these exact words in the feedback):",
    "- The feedback is meant for an online teaching context (do not write or mention 'online' or 'online teaching').",
    "",
    "Settings:",
    formatSettingsForPrompt(merged),
    "",
    "User additional context (use this to refine tone and content):",
    `"${safeUserFeedback}"`,
    "",
    "Output requirements:",
    "- Return ONLY the feedback text (no numbered steps, no extraneous commentary).",
    "- Keep length consistent with the 'Length' setting (Short: 1-2 sentences, Medium: 2-4 sentences, Detailed: 4+ sentences).",
    "- Use the requested Format (Paragraph, Bullet Points, or One-liner). If Bullet Points is chosen, provide 2–4 concise bullets.",
    "- Emphasize the 'Focus of Feedback' as the primary area to improve (but do not call it 'Focus of Feedback' — integrate naturally).",
    "",
    "Tone guidance: follow the Tone setting strictly (Professional, Casual/Friendly, Supportive, Constructive, or Neutral).",
    "",
    "Now generate the feedback:",
  ].join("\n");

  // Call the SDK
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    // optionally add parameters (temperature, max output tokens) if supported by the SDK
    // e.g. temperature: 0.2
  });

  const text = extractTextFromResponse(response);

  // If empty, throw so caller can handle fallback UI
  if (!text || text.trim().length === 0) {
    throw new Error("AI returned an empty response.");
  }

  return text.trim();
};
