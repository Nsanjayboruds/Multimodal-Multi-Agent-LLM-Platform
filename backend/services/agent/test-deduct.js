import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const deductCredits = async (userId, agent) => {
    try {
        console.log("Calling billing service at:", process.env.BILLING_SERVICE);
        const res = await axios.post(`${process.env.BILLING_SERVICE}/deduct`, { userId, agent });
        console.log("Success:", res.data);
    } catch (error) {
        console.error("Failed:", error.message);
        if (error.response) console.error("Data:", error.response.data);
    }
}

deductCredits('6a7ef456be4998441e36d1f6', 'coding');
