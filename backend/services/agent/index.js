import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import router from "./routes/agent.route.js"

const port =process.env.PORT

const app=express()

app.use(express.json({ limit: "50mb" }))
app.use("/",router)

app.use((err,req,res,next)=>{
  console.error("[agent service error]:", err)

  const status = err.status || 500
  const data = err.data || (err.error ? err.error : { message: err.message || "agent error" })

  return res.status(status).json(data)
})


app.get("/",(req,res)=>{
    res.json({message:"hello from agent"})
})

app.listen(port,()=>{
    console.log(`agent started at ${port}`)
    connectDb()
})
