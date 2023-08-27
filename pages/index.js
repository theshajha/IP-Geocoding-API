import Head from 'next/head';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
    const [ipAddress, setIpAddress] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAutoDetectIP();
    }, []);

    const fetchAutoDetectIP = async () => {
        try {
            const res = await fetch('/api/autoDetectIP');
            const json = await res.json();
            if (json.error) {
                console.log("Error IP:", json.ip_address);  // Log the problematic IP
            }
            setResult(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchSpecificIP = async () => {
        try {
            const res = await fetch(`/api/${ipAddress}`);
            if (res.headers.get("Content-Type").includes("application/json")) {
                const json = await res.json();
                setResult(json);
            } else {
                const text = await res.text();
                setError(`Unexpected response: ${text}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        fetchSpecificIP();
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>IP Geocoding API</title>
                <meta name="description" content="IP Geocoding API by TinyAPIs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to IP Geocoding API</h1>
                <p className={styles.description}>Use this API to locate and identify website visitors by IP address for FREE.</p>

                <div className={styles.row}>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input
                                type="text"
                                placeholder="IP Address"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    <div className={styles.resultContainer}>
                        {result && (
                            <div className={styles.result}>
                                <h2>Result:</h2>
                                <pre>{JSON.stringify(result, null, 2)}</pre>
                            </div>
                        )}

                        {error && (
                            <div className={styles.error}>
                                <h2>Error:</h2>
                                <p>{error}</p>
                                <h2>IPAddress:</h2>
                                <p>{ipAddress}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://www.tinyapi.co/service/ip-geolocation-api"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
             TinyAPIs
          </span>
                </a>
            </footer>
        </div>
    );
}
