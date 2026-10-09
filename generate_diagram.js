const zlib = require('zlib');
const fs = require('fs');
const https = require('https');

const mermaidCode = `graph TD
    Client["React Frontend (Vite)"]
    Gateway["API Gateway (:9000)"]
    
    subgraph Microservices
        Auth["Auth Service (:9001)"]
        Chat["Chat Service (:9002)"]
        Agent["Agent Service (:9003)"]
        Billing["Billing Service (:9004)"]
    end
    
    Redis[("Redis (Sessions & Limits)")]
    Mongo[("MongoDB (Primary DB)")]
    S3[("AWS S3 (Artifacts)")]
    
    LLMs(("LLMs (Groq, Gemini)"))
    Tools(("External APIs (Pollinations, Tavily)"))

    Client -->|HTTP Request| Gateway
    Gateway -->|/api/auth| Auth
    Gateway -->|/api/chat| Chat
    Gateway -->|/api/agent| Agent
    Gateway -->|/api/billing| Billing

    Auth <--> Redis
    Auth <--> Mongo
    
    Chat <--> Mongo
    
    Agent -->|Check Limits| Redis
    Agent -->|Deduct Cost| Billing
    Agent -->|Save Result| Chat
    Agent -->|Upload Documents| S3
    
    Agent <--> LLMs
    Agent <--> Tools
    
    Billing <--> Mongo`;

const data = Buffer.from(mermaidCode, 'utf8');
const compressed = zlib.deflateSync(data);
const encoded = compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
const url = `https://mermaid.ink/svg/pako:${encoded}`;

https.get(url, (res) => {
  const file = fs.createWriteStream('docs/architecture_diagram.svg');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('SVG downloaded!');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
