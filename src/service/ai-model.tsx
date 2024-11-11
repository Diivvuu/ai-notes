import { GoogleGenerativeAI } from "@google/generative-ai";

// The geminiPrompt string with placeholder values

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
console.log(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
});
