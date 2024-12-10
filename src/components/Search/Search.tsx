import { ChangeEvent, useRef, useState } from 'react';
import { AutocompleteList } from '../AutocompleteList/AutocompleteList';
import { clsx } from 'clsx';
import { getDatabasesResponse } from '../../data/service';
import { SearchItem } from '../../data/types';

import styles from './Search.module.css';

interface SearchInputProps {
    setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
    searchHistory: SearchItem[];
    setSearchHistory: React.Dispatch<React.SetStateAction<SearchItem[]>>;
}

export const SearchInput = ({
    setSearchValue,
    searchHistory,
    setSearchHistory,
}: SearchInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const autocompleteItems = getDatabasesResponse({ searchQuery: query });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleSelect = (item: SearchItem) => {
        setQuery(item.title);
        setSearchHistory((prev) => [...prev, item]);
        setSearchValue(item.title);
    };

    const handleEnterClicked = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchValue(e.currentTarget.value || null);
            inputRef.current?.blur();
        }
    };

    const handleUnselect = (item: SearchItem) => {
        setSearchHistory((prev) =>
            prev.filter((value) => value.id !== item.id)
        );
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const isAutocompleteMenuOpened = isFocused && autocompleteItems.length > 0;

    return (
        <div className={styles.searchInput}>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleEnterClicked}
                onBlur={handleBlur}
                placeholder="Search..."
                autoFocus
                className={clsx(styles.input, {
                    [styles.inputOpened]: isAutocompleteMenuOpened,
                })}
            />
            {isAutocompleteMenuOpened && (
                <AutocompleteList
                    items={autocompleteItems.slice(0, 10)}
                    onSelect={handleSelect}
                    onUnselect={handleUnselect}
                    searchHistory={searchHistory}
                />
            )}
        </div>
    );
};
