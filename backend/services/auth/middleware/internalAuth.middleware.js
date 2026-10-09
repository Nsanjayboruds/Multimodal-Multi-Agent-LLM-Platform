import crypto from "crypto"

const HEADER_NAME = "x-internal-secret"

function safeEqual(provided, expected) {
    if (typeof provided !== "string" || typeof expected !== "string") {
        return false
    }

    const providedBuf = Buffer.from(provided)
    const expectedBuf = Buffer.from(expected)

    if (providedBuf.length !== expectedBuf.length) {
        crypto.timingSafeEqual(expectedBuf, expectedBuf)
        return false
    }

    return crypto.timingSafeEqual(providedBuf, expectedBuf)
}

const internalAuth = (req, res, next) => {
    const expected = process.env.INTERNAL_SERVICE_SECRET

    if (!expected) {
        return res.status(403).json({ message: "Forbidden" })
    }

    const provided = req.headers[HEADER_NAME]

    if (!provided || !safeEqual(provided, expected)) {
        return res.status(403).json({ message: "Forbidden" })
    }

    next()
}

export default internalAuth
