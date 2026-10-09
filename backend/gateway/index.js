import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import protect from "./middleware/auth.middleware.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
const port =process.env.PORT

const app=express()
const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(204);
    }
    next();
});
app.use(morgan("dev"))
app.use(cookieParser())

const INTERNAL_AUTH_MUTATION_PATHS = new Set(["/update-plan", "/deduct-credits"])

app.use("/api/auth", (req, res, next) => {
    if (INTERNAL_AUTH_MUTATION_PATHS.has(req.path)) {
        return res.status(403).json({ message: "Forbidden" })
    }
    next()
})

app.use("/api/auth", proxy(process.env.AUTH_SERVICE, {
    proxyErrorHandler: (err, res, next) => {
        if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
            console.error(`[gateway] Auth service unavailable (${process.env.AUTH_SERVICE}):`, err.code)
            return res.status(503).json({ message: "Auth service temporarily unavailable. Please try again later." })
        }
        // Fallback: send a generic 503 — calling next(err) here does not reliably
        // reach the Express global error handler from inside express-http-proxy
        console.error("[gateway] Unexpected auth proxy error:", err)
        return res.status(503).json({ message: "Auth service encountered an error. Please try again later." })
    }
}))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxyWithHeader(process.env.AGENT_SERVICE))
app.use("/api/billing",protect,proxyWithHeader(process.env.BILLING_SERVICE))
app.get("/api/me",protect,getCurrentUser)
app.get("/",(req,res)=>{
    res.json({message:"hello from gateway v5"})
})

// Global error handler — must be registered before app.listen()
// Catches any unhandled errors from routes or proxies that call next(err)
app.use((err, req, res, next) => {
    console.error("[gateway] Unhandled error:", err)
    res.status(500).json({ message: "An unexpected error occurred. Please try again." })
})

app.listen(port, () => {
    console.log(`gateway started at ${port}`)
})
