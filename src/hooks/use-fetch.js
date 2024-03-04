import { useState, useEffect } from 'react';

// Custom hook to fetch data, with support for authentication and method specification
function useFetch(url, method = 'GET', body = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setData(null);
            setError(null);
            setLoading(true);

            // Retrieve the authentication token from storage
            const token = window.localStorage.getItem('token');

            // Configure the fetch options
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    // Include the authentication token in the request header, if available
                    ...(token && { 'Authorization': `Token ${token}` }),
                },
                // Include the body in the options if the method is not GET
                ...(method !== 'GET' && body && { body: JSON.stringify(body) }),
            };

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                // Assume response needs to be json decoded, adjust if needed
                const responseData = await response.json();

                setData(responseData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body]); // Re-run the effect if url, method, or body changes

    return { data, error, loading };
}

export default useFetch;
