const rateLimit = {
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests
    ipCache: {}
};

export const rateLimiter = (req, res) => {
    const now = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!rateLimit.ipCache[ip]) {
        rateLimit.ipCache[ip] = { count: 0, lastRequest: now };
    } else {
        if (now - rateLimit.ipCache[ip].lastRequest < rateLimit.windowMs) {
            rateLimit.ipCache[ip].count += 1;
        } else {
            rateLimit.ipCache[ip] = { count: 1, lastRequest: now };
        }
    }

    if (rateLimit.ipCache[ip].count > rateLimit.max) {
        return { status: 429, message: 'Too many requests' };
    }

    return null;
};
