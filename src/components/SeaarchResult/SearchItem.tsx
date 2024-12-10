import styles from './SearchResultItem.module.css';

interface SearchItemProps {
    id: number;
    title: string;
    description: string;
}

export const SearchResultItem = ({
    id,
    title,
    description,
}: SearchItemProps) => {
    return (
        <li key={id} className={styles.item}>
            <a
                href={`#${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                {title}
            </a>
            <p className={styles.description}>{description}</p>
        </li>
    );
};
