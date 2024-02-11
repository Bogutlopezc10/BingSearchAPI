import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface BingSearchResult {
    name: string;
    url: string;
}

const BingSearch = (): JSX.Element => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<BingSearchResult[]>([]);
    const maxResults = 10; // Define the maximum number of results you want to retrieve
    const retryDelay = 1000; // 1 second

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<any>('https://api.bing.microsoft.com/v7.0/search', {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '934eb53594e54b9c945aabdf02b0d53c'
                    },
                    params: {
                        q: query,
                        count: maxResults // Limit the number of results
                    }
                });
                setResults(response.data?.webPages?.value || []);
            } catch (error: any) { // Explicitly cast error to any type
                console.error('Error fetching data:', error);
                if ((error as AxiosError)?.response?.status === 429) { // Use type assertion
                    // Retry after delay if rate limit exceeded
                    setTimeout(fetchData, retryDelay);
                }
            }
        };

        if (query !== '') {
            fetchData();
        }
    }, [query]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <a href={result.url}>{result.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BingSearch;