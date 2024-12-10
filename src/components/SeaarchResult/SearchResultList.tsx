import { SearchResultItem } from './SearchItem';
import styles from './SearchResultList.module.css';
import { getResponseWithPagination } from '../../data/service';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { SearchItem } from '../../data/types';

interface SearchResultsProps {
    searchValue: string;
}

export const SearchResults = ({ searchValue }: SearchResultsProps) => {
    const [currentPage, setPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [time, setTime] = useState<number>(0);
    const [values, setValues] = useState<SearchItem[]>([]);
    const [count, setCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getResponseWithPagination({
            searchQuery: searchValue,
            page: currentPage,
            itemsPerPage,
        }).then((response) => {
            setCount(response.count);
            setTime(response.requestTime);
            setValues(response.values);
            setIsLoading(false);
        });
    }, [currentPage, searchValue, itemsPerPage]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const totalPages = Math.ceil(count / itemsPerPage);

    return (
        <div className={styles.container}>
            <hr className={styles.divider} />
            <p className={styles.speed}>
                Found {count} results in {(time / 1000).toFixed(2)} seconds.
            </p>
            <ul className={styles.list}>
                {values.map(({ id, title, description }) => (
                    <SearchResultItem
                        key={id}
                        id={id}
                        title={title}
                        description={description}
                    />
                ))}
            </ul>
            <div className={styles.pagination}>
                {Array(totalPages)
                    .fill(0)
                    .map((_, i) => {
                        const page = i + 1;
                        return (
                            <div
                                key={page}
                                onClick={() => setPage(page)}
                                className={clsx(styles.pagination_item, {
                                    [styles.pagination_item_active]:
                                        page === currentPage,
                                })}
                            >
                                {page}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
