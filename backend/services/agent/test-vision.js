import { visionAgent } from "./agents/vision.agent.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
    await connectDb();
    const result = await visionAgent({
        prompt: 'a dog with a car',
        userId: '6a7ef456be4998441e36d1f6'
    });
    console.log("FINAL RESULT:", JSON.stringify(result, null, 2));
};
run();
