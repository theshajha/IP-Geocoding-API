import { getGeoData } from '/lib/getGeoData';

const rateLimit = {
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests
    ipCache: {}
};

export default async function handler(req, res) {
    const now = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Implement rate limiting
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
            return res.status(429).json({ error: "Too many requests" });
        }

        const data = getGeoData(ip);
        if (data.error) {
            return res.status(404).json({ error: data.error });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ error:  JSON.stringify(error)});
    }
}
