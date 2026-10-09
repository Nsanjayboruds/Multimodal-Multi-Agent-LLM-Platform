import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
});

const prompt = `
        You are CortexAI Coding Agent.
Generate the requested project.
Return ONLY valid JSON.
Schema:
{
  "files":[
    {
      "name":"index.html",
      "content":"..."
    }
  ]
}
Rules:
- Output must start with {
- Output must end with }
- No markdown
User Request: give a landing page code
`;

groq.invoke(prompt).then(res => {
    console.log("Raw output:", res.content);
    try {
        JSON.parse(res.content);
        console.log("JSON parse SUCCESS!");
    } catch (e) {
        console.error("JSON parse FAILED:", e);
    }
}).catch(err => console.error(err));
