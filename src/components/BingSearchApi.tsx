import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface BingSearchResult {
    name: string;
    url: string;
}

const BingSearch = (): JSX.Element => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<BingSearchResult[]>([]);
    const maxResults = 10; // Define the maximum number of results you want to retrieve
    const retryDelay = 1000; // 1 second
    const apiEndPoint = process.env.REACT_APP_BING_SEARCH_API_ENDPOINT ?? 'default_api_endpoint';
    const apiKey = process.env.REACT_APP_BING_SEARCH_API_KEY ?? 'default_api_key';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<any>(apiEndPoint, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': apiKey
                    },
                    params: {
                        q: query,
                        count: maxResults // Limit the number of results
                    }
                });
                setResults(response.data?.webPages?.value || []);
            } catch (error: any) { 
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
    }, [query, apiKey, apiEndPoint]);

    return (
        <>
            <SearchInput onSearch={setQuery}/>
            <SearchResults results={results}/>
        </>
    );
};

export default BingSearch;