import { Groq } from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
groq.models.list().then(res => {
  console.log(res.data.map(m => m.id).join(", "));
}).catch(err => console.error(err));
