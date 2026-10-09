import { pdfAgent } from "./agents/pdf.agent.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
    await connectDb();
    const result = await pdfAgent({
        prompt: 'on node.js',
        userId: '6a7ef456be4998441e36d1f6'
    });
    console.log("FINAL RESULT:", JSON.stringify(result, null, 2).substring(0, 1000) + '...');
};
run();
