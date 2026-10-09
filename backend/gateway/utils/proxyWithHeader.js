import proxy from "express-http-proxy"

export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user) {
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
            }
            return proxyReqOpts
        },
        proxyErrorHandler: (err, res, next) => {
            if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
                console.error(`[gateway] Downstream service unavailable (${serviceUrl}):`, err.code)
                return res.status(503).json({ message: "Service temporarily unavailable. Please try again later." })
            }
            // Fallback: send a generic 503 — calling next(err) here does not reliably
            // reach the Express global error handler from inside express-http-proxy
            console.error(`[gateway] Unexpected proxy error (${serviceUrl}):`, err)
            return res.status(503).json({ message: "Service encountered an error. Please try again later." })
        }
    })
}