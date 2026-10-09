import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
});

const prompt = `
    You are an intent classifier.

Return ONLY one of these values.

CODE_GENERATION
CODE_REVIEW
CODE_EXPLANATION
DEBUGGING
OPTIMIZATION
CONVERSION
DOCUMENTATION

User Request:
give a landing page code
    `;

groq.invoke(prompt).then(res => {
    console.log("Intent result:", res.content);
}).catch(err => console.error("Intent failed:", err));
