import React from 'react';

interface SearchResult {
  name: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <ul className="list-group">
      {results.map((result, index) => (
        <li key={index} className="list-group-item">
          <a href={result.url}>{result.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;