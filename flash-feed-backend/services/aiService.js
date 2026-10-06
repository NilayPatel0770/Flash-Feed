require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateSummary = async (content) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize this news article into 4 concise bullet points.\n\n${content}`,
        });
        return response.text;
    } catch (err) {
        console.warn("Gemini generateSummary fallback:", err.message);
        const sentences = (content || "").split(".").filter(s => s.trim().length > 10);
        return sentences.slice(0, 4).map(s => `- ${s.trim()}.`).join("\n");
    }
};

const generateKeywords = async (content) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Extract only 5 important keywords from this article.\n\nReturn ONLY a comma-separated list.\n\n${content}`,
        });
        return response.text;
    } catch (err) {
        console.warn("Gemini generateKeywords fallback:", err.message);
        return "News, Updates, Highlights, Trending, Flash Feed";
    }
};

const analyzeSentiment = async (content) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the sentiment of this news article.\n\nReturn ONLY ONE WORD:\nPositive\nNegative\nNeutral\n\nArticle:\n${content}`,
        });
        return response.text.trim();
    } catch (err) {
        console.warn("Gemini analyzeSentiment fallback:", err.message);
        return "Neutral";
    }
};


module.exports = {
    generateSummary,
    generateKeywords,
    analyzeSentiment
};