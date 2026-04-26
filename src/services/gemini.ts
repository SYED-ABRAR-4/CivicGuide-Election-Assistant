import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askElectionAssistant(query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return "The Gemini API key is missing. Please configure your GEMINI_API_KEY in the environment variables to enable the AI Assistant.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are an expert Election Assistant. Your goal is to help users understand the election process, voting steps, and timelines in a non-partisan, clear, and encouraging way. 
        Focus on providing accurate, step-by-step information. If you don't know a specific detail for a specific local region, advise the user to check their official local election office website. 
        Use markdown for formatting. Keep responses concise and scannable.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
}
