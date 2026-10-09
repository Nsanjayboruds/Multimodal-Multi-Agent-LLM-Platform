import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
});

gemini.invoke("Say hi").then(res => {
    console.log("SUCCESS! Result:", res.content);
}).catch(err => {
    console.error("ERROR:");
    console.error(err.message || err);
});
