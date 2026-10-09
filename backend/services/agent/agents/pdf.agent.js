import { getModel } from "../config/llmModels.js"
import { generatePdf } from "../utils/generatePdf.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const pdfAgent=async (state) => {
    try {
        const rate=await checkAgentLimit(state.userId,"pdf")
        
        
        const llm=await getModel("pdf")
        const prompt=`
        You are an expert document writer.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Structure:

{
"title":"",
"subtitle":"",
"sections":[
{
"heading":"",
"points":[]
}
]
}

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Topic:

${state.prompt}
        `

        const res=await llm.invoke(prompt)
        
        // Extract JSON from potential markdown backticks
        let rawContent = res.content.trim();
        if (rawContent.includes("```")) {
            const match = rawContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
            if (match && match[1]) {
                rawContent = match[1];
            }
        }
        
        const data=JSON.parse(rawContent)
       await deductCredits(state.userId,"pdf")
        
        const pdfBuffer=await generatePdf(data)

        const downloadUrl = `data:application/pdf;base64,${pdfBuffer.toString("base64")}`

        return {
          ...state,
          aiResponse:`# PDF Generated

**${data.title}**

📥 [Download PDF](${downloadUrl})`
        }

    } catch (error) {
       console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || "failed to generate pdf"
        }
    }
}