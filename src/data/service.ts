import {localDB, SearchItem} from "./localDB";

interface DatabaseResponseProps {
    searchQuery: string;
}


export const getDatabasesResponse = ({searchQuery}: DatabaseResponseProps) => {
    const filteredItems = localDB.filter((item) =>
        item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    return filteredItems;
}

interface ResponseWithPaginationProps extends DatabaseResponseProps {
    page: number;
    itemsPerPage: number;
}

export const getResponseWithPagination = ({searchQuery, page, itemsPerPage}: ResponseWithPaginationProps): Promise<{ count: number; requestTime: number; values: SearchItem[]}> => {
    const requestStartTime = new Date().getTime();

    return new Promise((resolve) => {
        const values = getDatabasesResponse({searchQuery});
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;


       setTimeout(() => {
           resolve({
               values: values.slice(startIndex, endIndex),
               count: values.length,
               requestTime: new Date().getTime() - requestStartTime,
           })
       }, 900)
    })


}
