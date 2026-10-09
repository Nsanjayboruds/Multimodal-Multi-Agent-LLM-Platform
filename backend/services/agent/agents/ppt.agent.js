import { getModel } from "../config/llmModels.js"
import { generatePpt } from "../utils/generatePpt.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const pptAgent=async (state) => {
    try {
        await checkAgentLimit(state.userId,"ppt")
        const llm=await getModel("ppt")
        const prompt=`You are a professional presentation designer.

Return ONLY valid JSON.

Format:

{
"title":"",
"subtitle":"",
"slides":[
{
"title":"",
"points":[
"",
"",
"",
""
]
}
]
}

Rules:

- Generate exactly 6 content slides.
- Each slide should have 4-6 concise bullet points.
- No markdown.
- No explanation.
- No code block.
- Return ONLY JSON.

Topic:

${state.prompt}`

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
await deductCredits(state.userId,"ppt")
const ppt=await generatePpt(data)
const buffer=await ppt.write({
    outputType:"nodebuffer"
})

const downloadUrl = `data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,${buffer.toString("base64")}`

return {
    ...state,
    aiResponse:`# ✅ Presentation Generated

**${data.title}**

📥 [Download PPT](${downloadUrl})`
}

    } catch (error) {
        console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || "failed to generate ppt"
        }
       

       
    }
}