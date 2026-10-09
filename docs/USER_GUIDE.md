# User Guide: E.D.I.T.H. AI

Welcome to E.D.I.T.H. AI! This guide will walk you through the platform's capabilities, how to interact with the different artificial intelligence agents, and how the internal credit economy works.

---

## 1. Getting Started

### Authentication
E.D.I.T.H. AI uses a secure Google Firebase authentication system. 
1. Upon loading the app, you will be greeted by the login screen.
2. Click **"Sign In with Google"** or use your email/password to securely create an account.
3. Your session is securely maintained via server-side cookies, ensuring your chats and credits remain strictly private.

---

## 2. The Agent Ecosystem

E.D.I.T.H. AI features a suite of specialized agents. At the bottom of your chat interface, you will see a toggle bar allowing you to select your preferred agent, or you can let the **Auto** agent decide for you!

### 🤖 Auto Mode
Don't know which agent to use? Leave the toggle on **Auto**. Behind the scenes, an intelligent LangGraph router analyzes your prompt and automatically connects you to the best agent for the job.

### 💬 Chat Agent
Your daily conversational assistant. Great for answering general knowledge questions, summarizing text, or brainstorming ideas.

### 💻 Coding Agent
Specifically tuned for software development. 
- Ask it to write a React component, debug Python code, or explain a complex algorithm. 
- All code outputs are returned in beautiful, syntax-highlighted blocks with an instant **Copy** button.

### 📄 PDF & 📊 PPT Agents
E.D.I.T.H. AI can generate entire, multi-page PDF documents and PowerPoint presentations for you instantly.
- **Usage:** Simply ask: *"Generate a PDF explaining the architecture of Node.js"*
- **Result:** The agent will compile the document and provide a direct "Download" link in the chat.
- *Note:* Documents are generated completely in-memory and streamed directly to your browser for maximum privacy.

### 👁️ Vision Agent
The Vision agent generates stunning, photorealistic images based on your prompts.
- **Usage:** Ask: *"Generate a cinematic image of a futuristic city at sunset"*
- The image will be rendered directly inside the chat interface, and you can click it to open a full-screen lightbox view.

### 🔍 Search Agent
Needs real-time data? The search agent connects to the Tavily search engine to pull live information, news, and current events directly from the internet.

---

## 3. PDF Chat (RAG)

E.D.I.T.H. AI allows you to "talk" to your documents!
1. Click the **Paperclip icon** next to the chat bar to upload a PDF.
2. The AI will instantly analyze and index the document.
3. You can now ask questions like: *"What is the main conclusion of chapter 3?"* and the AI will answer based *strictly* on the document's contents.

---

## 4. The Credit Economy

Running advanced AI models requires immense computational power. To manage this, E.D.I.T.H. AI uses a **Credit System**.

### Earning Credits
- New accounts are granted a starting balance of **free credits**.
- You can view your current credit balance in the **Sidebar** or by opening the **Billing Drawer**.

### Credit Consumption
Different agents consume different amounts of credits based on their computational complexity:
- **Chat & Code:** Low credit cost.
- **Web Search:** Moderate credit cost.
- **Vision (Image Generation):** High credit cost.
- **PDF/PPT Generation:** High credit cost.

### Purchasing More Credits
When you run out of credits, you can seamlessly purchase more:
1. Click your profile/credits balance in the bottom left corner to open the **Billing Drawer**.
2. Select a credit package.
3. A secure **Razorpay** checkout window will appear. 
4. *(Note: If the platform is currently in Test Mode, you can use standard test cards to simulate a transaction).*
5. Upon successful payment, your credits are instantly updated without needing to refresh the page!
