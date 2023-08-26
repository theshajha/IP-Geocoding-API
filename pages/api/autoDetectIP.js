import { getGeoData } from '../../lib/getGeoData';
import { rateLimiter } from '../../lib/rateLimiter';

export default async function handler(req, res) {
    const rateLimitStatus = rateLimiter(req, res);
    if (rateLimitStatus) {
        return res.status(rateLimitStatus.status).json({ error: rateLimitStatus.message });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const data = getGeoData(ip);

    if (!data) {
        return res.status(404).json({ error: 'IP address not found' });
    }

    if (data.error) {
        return res.status(400).json(data);
    }

    return res.status(200).json(data);
}
