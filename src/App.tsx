import {useState} from 'react';
import './styles/App.css';
import {SearchInput} from "./components/Search/Search"
import {SearchResults} from "./components/SeaarchResult/SearchResultList";
import {SearchItem} from "./data/localDB";

export function App() {
    const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>(null)
    // setResults(autocompleteItems.filter((entry) =>
    //     entry.title.toLowerCase().includes(item.title.toLowerCase())
    // ));
    return (
        <div className="app">
            <h1>Search X</h1>
            <SearchInput
                setSearchValue={setSearchValue}
                searchHistory={searchHistory}
                setSearchHistory={setSearchHistory}
            />
            {searchValue && <SearchResults searchValue={searchValue}/>}
        </div>
    );
}

