# IP Geocoding API by TinyAPI

![TinyAPIs Banner](banner.png)

IP Geocoding API is a robust, scalable, and easy-to-use API for IP-based geolocation. Hosted at [ip-geocode.tinyapi.co](https://ip-geocode.tinyapi.co), this API provides detailed information about the geographical location, currency, and other details based on the IP address.

## Features

- **Auto IP Detection**: Automatically identifies the client's IP.
- **Specific IP Query**: Allows querying specific IP addresses.
- **Rich Geolocation Info**: Provides details like country, city, postal code, latitude, longitude, and much more.
- **Rate Limiting**: Ensures fair usage by limiting requests.

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/TinyAPIs/ip-geocoding-api.git
cd ip-geocoding-api
yarn install
yarn dev
```

## API Endpoints

The IP Geocoding API offers two primary endpoints:

### Auto Detect IP

This endpoint automatically detects the client's IP address and returns relevant geolocation data.

- **Endpoint**: `/api/autoDetectIP`
- **Method**: `GET`
- **Response Format**: JSON

Example:

```bash
curl https://ip-geocode.tinyapi.co/api/autoDetectIP
```

### Specific IP Query

This endpoint allows you to query geolocation information for a specific IP address.

- **Endpoint**: `/api/[ip]/`
- **Method**: `GET`
- **Response Format**: JSON

Example:

```bash
curl https://ip-geocode.tinyapi.co/api/192.168.1.1/ # Replace with your IP address
```


## Rate Limits and Caching

To prevent abuse and ensure fair usage, we have implemented rate limiting and caching on our API. Each IP address is limited to 100 requests every 15 minutes. We also use caching to improve response times and reduce server load. The data is cached for 5 minutes, so subsequent requests for the same data within this period will be served faster.

## Paid Version

For commercial use cases or if you need higher limits, a paid version of this API is available via [TinyAPI](https://www.tinyapi.co/service/currency-conversion-api). The paid version offers higher rate limits and priority support.

## Contributing

We welcome contributions to this project. Please feel free to submit a pull request or open an issue if you find any bugs or have any suggestions for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
