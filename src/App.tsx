import { useState } from 'react';
import { SearchInput } from './components/Search/Search';
import { SearchResults } from './components/SeaarchResult/SearchResultList';
import { SearchItem } from './data/types';

import './styles/App.css';

export function App() {
    const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>(null);

    return (
        <div className="app">
            <h1>Search X</h1>
            <SearchInput
                setSearchValue={setSearchValue}
                searchHistory={searchHistory}
                setSearchHistory={setSearchHistory}
            />
            {searchValue && <SearchResults searchValue={searchValue} />}
        </div>
    );
}
