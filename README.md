# E.D.I.T.H. AI 🚀

**E.D.I.T.H. AI** is an advanced, multi-agent Artificial Intelligence platform powered by a distributed microservices architecture and a highly reactive React frontend. It provides users with an expansive suite of intelligent autonomous agents capable of seamlessly handling general chat conversations, complex code generation, stunning visual image rendering, web searching, and automated compilation of multi-page PDF/PPT artifacts.

---

## 🌟 Key Features

- **🧠 Autonomous Agent Routing:** Employs an intelligent LLM router (LangGraph) that automatically classifies user intent and seamlessly directs prompts to the most capable specialized agent without user intervention.
- **📄 Instant Artifact Generation:** Generates comprehensive, multi-page PDFs and PPTs on-the-fly. Bypasses cloud storage (S3) by natively securely streaming documents to the client as Base64 Data URIs for instant downloading.
- **👁️ Vision & Image Analysis:** Analyzes uploaded images using advanced multimodal LLMs and generates new visual content on demand.
- **📚 PDF RAG (Retrieval-Augmented Generation):** Chat directly with your uploaded PDF documents. E.D.I.T.H. AI extracts context and provides highly accurate, cited answers based strictly on the uploaded text.
- **💻 Coding Assistant:** Writes, debugs, and explains complex code across various languages with syntax highlighting and instant copy-to-clipboard functionality.
- **💳 Integrated Economy:** Built-in credit system with Razorpay integration. Agents seamlessly consume credits for heavy computational tasks (Vision, Documents, Coding).

---

## 🏗️ System Architecture

The platform runs on a robust backend infrastructure comprising **five independently scalable microservices**, orchestrated by an API Gateway:

1. **Gateway (`:9000`)** - Centralized entry point, reverse proxy, and CORS handler.
2. **Auth Service (`:9001`)** - Handles Firebase authentication, session cookies, and user registration.
3. **Chat Service (`:9002`)** - Manages conversation history, message persistence, and UI state synchronization.
4. **Agent Service (`:9003`)** - The core brain. Orchestrates LangChain/LangGraph logic, LLM API calls (Groq/Gemini), and artifact generation.
5. **Billing Service (`:9004`)** - Manages Razorpay webhooks, credit deduction, and user balances.

> 📘 **Deep Dive:** For detailed technical insights into the architecture, state management, and system flow, please review the official [Architecture Documentation](./docs/ARCHITECTURE.md).

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Lucide React Icons
- **State Management:** Redux Toolkit
- **Markdown Parsing:** React-Markdown + Remark-GFM
- **Auth:** Firebase Authentication

### **Backend**
- **Runtime:** Node.js + Express
- **Architecture:** Microservices (express-http-proxy)
- **Database:** MongoDB (Mongoose) - Segmented per microservice
- **Caching & Sessions:** Redis
- **AI Frameworks:** LangChain, LangGraph
- **LLM Providers:** Groq, Gemini, Tavily (Web Search)

---

## 🚀 Getting Started

Follow these steps to launch E.D.I.T.H. AI locally on your machine.

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Redis** server running locally on port `6379`.
- **MongoDB** cluster (Atlas or Local).
- Required API Keys: Firebase, Groq, Gemini, Tavily, Razorpay.

### 2. Environment Variables Configuration
The project is segmented into multiple microservices, each requiring its own `.env` file. You must create the following `.env` files in their respective directories:

<details>
<summary><b>🖥️ Frontend (<code>frontend/.env</code>)</b></summary>

```env
VITE_FIREBASE_API_KEY=your_firebase_key
RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_SERVER_URL=http://localhost:9000
```
</details>

<details>
<summary><b>🚪 Gateway (<code>backend/gateway/.env</code>)</b></summary>

```env
PORT=9000
AUTH_SERVICE=http://localhost:9001
CHAT_SERVICE=http://localhost:9002
AGENT_SERVICE=http://localhost:9003
BILLING_SERVICE=http://localhost:9004
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```
</details>

<details>
<summary><b>🔐 Auth Service (<code>backend/services/auth/.env</code>)</b></summary>

```env
PORT=9001
MONGODB_URI=your_mongodb_auth_uri
REDIS_URL=redis://localhost:6379
INTERNAL_SERVICE_SECRET=your_long_random_shared_secret
```
</details>

<details>
<summary><b>💬 Chat Service (<code>backend/services/chat/.env</code>)</b></summary>

```env
PORT=9002
MONGODB_URI=your_mongodb_chat_uri
```
</details>

<details>
<summary><b>🤖 Agent Service (<code>backend/services/agent/.env</code>)</b></summary>

```env
PORT=9003
MONGODB_URI=your_mongodb_agent_uri
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_search_key
QDRANT_API_KEY=your_qdrant_key
QDRANT_URL=your_qdrant_url
CHAT_SERVICE=http://localhost:9002
AUTH_SERVICE=http://localhost:9001
BILLING_SERVICE=http://localhost:9004
REDIS_URL=redis://localhost:6379
INTERNAL_SERVICE_SECRET=your_long_random_shared_secret
```
</details>

<details>
<summary><b>💳 Billing Service (<code>backend/services/billing/.env</code>)</b></summary>

```env
PORT=9004
MONGODB_URI=your_mongodb_billing_uri
AUTH_SERVICE=http://localhost:9001
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
INTERNAL_SERVICE_SECRET=your_long_random_shared_secret
```
</details>


### 3. Launching the Platform

**Start the Backend Services:**
The backend utilizes `concurrently` to spin up the gateway and all 4 microservices simultaneously.
```bash
cd backend
npm install
npm run dev
```

**Start the Frontend:**
In a separate terminal, launch the Vite development server.
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser to access the E.D.I.T.H. AI interface!

---

## 📖 API Documentation

For detailed endpoint documentation, request payload structures, microservice routing logic, and credit economy mechanics, please refer to the [API Documentation](./docs/API.md).

---

*“Even Dead, I'm The Hero.”* — **E.D.I.T.H.**
