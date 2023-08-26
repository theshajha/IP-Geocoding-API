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
    const phoneCode = getCountryCallingCode(geo.country);

    return {
        ip: ip,
        countryCode: geo.country,
        countryName: countryInfo.name,
        continent: countryInfo.continent,
        regionCode: geo.region,
        regionName: geo.region,  // Replace with actual region name if available
        city: geo.city,
        postalCode: geo.zip,
        latitude: geo.ll[0],
        longitude: geo.ll[1],
        accuracyRadius: null,  // Not available in geoip-lite
        timeZone: timeZone,
        phoneCode: `+${phoneCode}`,
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
