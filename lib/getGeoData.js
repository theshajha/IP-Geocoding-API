import geoip from 'geoip-lite';
import { find } from 'geo-tz';
import { getCountryCallingCode } from 'libphonenumber-js';
import { countries } from 'country-data';

export const getGeoData = (ip) => {
    const geo = geoip.lookup(ip);
    if (!geo) {
        return { error: 'IP address not found' };
    }

    const countryInfo = countries[geo.country];
    if (!countryInfo) {
        return { error: 'Country not found' };
    }

    if (!geo.ll[0] && !geo.ll[1]) {
        return { error: 'Invalid coordinates', receivedCoordinates: geo.ll };
    }

    const timeZone = find(geo.ll[1], geo.ll[0])[0];

    let phoneCode = null;
    try {
        phoneCode = getCountryCallingCode(geo.country);
    } catch (err) {
        console.error(`Failed to fetch phone code for country ${geo.country}`, err);
    }

    return {
        ip: ip,
        countryCode: geo.country,
        countryName: countryInfo.name,
        continent: countryInfo.continent,
        regionCode: geo.region,
        regionName: geo.region,
        city: geo.city,
        postalCode: geo.zip,
        latitude: geo.ll[0],
        longitude: geo.ll[1],
        accuracyRadius: null,
        timeZone: timeZone,
        phoneCode: phoneCode ? `+${phoneCode}` : null,
        currency: countryInfo.currencies[0],
        language: countryInfo.languages[0],
        connection: {
            asn: null,
            isp: null,
            organization: null,
            domain: null,
            isHostingProvider: false,
            isPublicProxy: false,
            isTorExitNode: false,
            userType: null
        },
        security: {
            isProxy: false,
            isCrawler: false,
            proxyType: null,
            crawlerName: null
        }
    };
};
