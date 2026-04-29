import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("[AI] GROQ_API_KEY is missing in environment variables.");
}

export const groq = new Groq({
  apiKey: apiKey || "MISSING_KEY",
});

export const validateGroqConfig = () => {
  if (!apiKey) {
    throw new Error("GROQ_API_KEY_MISSING");
  }
};
