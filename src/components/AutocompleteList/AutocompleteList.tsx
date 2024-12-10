import { AutocompleteItem } from './AutocompleteItem';
import styles from './AutocompleteList.module.css';
import { clsx } from 'clsx';
import { SearchItem } from '../../data/types';

interface AutocompleteListProps {
    items: SearchItem[];
    onSelect: (item: SearchItem) => void;
    onUnselect: (item: SearchItem) => void;
    searchHistory: SearchItem[];
}

export const AutocompleteList = ({
    items,
    onSelect,
    searchHistory,
    onUnselect,
}: AutocompleteListProps) => {
    // We use onMouseDown insteadof onClick cause otherwise we close autocomplete menu (lose focus on input) early than onClick start work
    return (
        <ul className={clsx(styles.autocompleteList)}>
            {items.map((item) => (
                <AutocompleteItem
                    key={item.id}
                    item={item}
                    isSelectedItem={searchHistory.some(
                        (history) => history.id === item.id
                    )}
                    onSelect={onSelect}
                    onUnselect={onUnselect}
                />
            ))}
        </ul>
    );
};
