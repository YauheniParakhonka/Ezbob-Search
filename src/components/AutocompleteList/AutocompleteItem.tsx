import {SearchItem} from "../../data/localDB";
import styles from './AutocompleteItem.module.css'
import {clsx} from "clsx";

interface AutocompleteItemProps {
    onSelect: (item: SearchItem) => void;
    onUnselect: (item: SearchItem) => void;
    item: SearchItem;
    isSelectedItem?: boolean;
}

export const AutocompleteItem = ({isSelectedItem, item, onSelect, onUnselect}: AutocompleteItemProps) => {


    return <div className={styles.item}>
        <li
            key={item.id}
            className={clsx({[styles.history]: isSelectedItem})}
            onMouseDown={() => {
                onSelect(item)
            }}
        >
            {item.title}
        </li>
        {isSelectedItem && <button className={styles.removeButton} onMouseDown={() => onUnselect(item)}>Remove</button>}
    </div>
}
