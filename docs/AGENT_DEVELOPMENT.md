# Agent Development Guide 🤖

E.D.I.T.H. AI utilizes a powerful LLM orchestration framework powered by **LangGraph**. The system is highly modular, allowing developers to quickly create and inject new specialized agents into the autonomous router ecosystem.

This guide explains how to build a new agent and wire it into the E.D.I.T.H. core.

---

## The LangGraph Architecture

The Agent Service (`backend/services/agent/`) acts as the brain of the platform.
1. The user's prompt hits the `router.js` node.
2. The router uses a lightweight LLM to classify the user's intent.
3. LangGraph conditionally routes the state payload to the appropriate agent node.
4. The targeted agent executes its specific logic and updates the state with the `aiResponse`.

---

## Step-by-Step: Adding a New Agent

Let's imagine we are building a new **Audio Transcription Agent** that transcribes text and explains it.

### Step 1: Create the Agent Node

Create a new file in `backend/services/agent/agents/audio.agent.js`.

An agent is simply an async function that receives the current `state` object, interacts with an LLM or external tool, and returns the modified `state`.

```javascript
import { getModel } from "../config/llmModels.js";
import { deductCredits } from "../config/deductCredits.js";

export const audioAgent = async (state) => {
    try {
        // 1. Initialize the LLM (e.g., Groq LLaMA3)
        const llm = await getModel("chat");
        
        // 2. Define the specialized System Prompt
        const prompt = `You are a specialized audio analysis assistant.
        Analyze the following user query:
        ${state.prompt}`;

        // 3. Invoke the LLM
        const res = await llm.invoke(prompt);

        // 4. Consume credits for this specialized action
        await deductCredits(state.userId, "audio");

        // 5. Return the updated state to LangGraph
        return {
            ...state,
            aiResponse: res.content
        };

    } catch (error) {
        console.error("Audio Agent Error:", error);
        return {
            ...state,
            aiResponse: "Failed to process audio request."
        };
    }
};
```

### Step 2: Register the Agent in the Router

The router must know about your new agent so it can automatically route traffic to it.
Open `backend/services/agent/graph/router.js` and update the LLM prompt instructions:

```javascript
  const prompt = `You are an agent router.

Available agents:
- chat
- search
- coding
- pdf
- ppt
- vision
- audio   <--- ADD THIS

Rules:
...
audio:
Questions about transcribing,
audio processing,
or speech.

Return ONLY one word:
chat
search
coding
pdf
ppt
vision
audio     <--- ADD THIS
```

### Step 3: Wire the Agent into LangGraph

Open `backend/services/agent/graph/graph.js` to physically connect the node.

1. **Import the agent:**
   ```javascript
   import { audioAgent } from "../agents/audio.agent.js";
   ```

2. **Add the node to the graph:**
   ```javascript
   workflow.addNode("audio", audioAgent);
   ```

3. **Update the conditional routing logic:**
   ```javascript
   workflow.addConditionalEdges("router", (state) => {
       switch (state.agent) {
           // ... existing cases ...
           case "audio":
               return "audio";
       }
   }, {
       // ... existing maps ...
       audio: "audio"
   });
   ```

4. **Add the termination edge:**
   ```javascript
   workflow.addEdge("audio", "__end__");
   ```

### Step 4: Update the Frontend UI (Optional)

If you want users to be able to *manually* select your new agent, update the frontend toggle bar.

1. Open `frontend/src/components/ChatInput.jsx`.
2. Add your agent to the button mapping array.
3. Ensure the `agent` payload matches the exact string (`"audio"`) you registered in the backend router!

---

## 🎯 Best Practices

- **JSON Parsing:** If your agent requires the LLM to output structured JSON data, ensure you strip any markdown backticks (` ```json `) before calling `JSON.parse()`. Conversational LLMs often wrap JSON in markdown natively.
- **Credit Deductions:** Ensure `deductCredits()` is called *after* initial validations but *before* heavy API generation to prevent system abuse.
- **Error Handling:** Always wrap your agent logic in a `try/catch` and return a safe fallback string to `aiResponse` so the frontend doesn't crash on timeouts.
