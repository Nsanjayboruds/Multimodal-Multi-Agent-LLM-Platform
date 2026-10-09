import redis from "../../shared/redis/redis.js"

const protect=async (req,res,next) => {
    try {
        const sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(401).json({message:"Unauthorized: no session"})
        }
        const session=await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(401).json({message:"Unauthorized: session expired"})
        }
        req.user=JSON.parse(session)
        next()
       
    } catch (error) {
        console.error("[auth.middleware] Unexpected error:", error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export default protect