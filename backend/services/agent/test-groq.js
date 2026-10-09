import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();
const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
})
groq.invoke("Say hi").then(res => console.log(res.content)).catch(err => console.error(err));
