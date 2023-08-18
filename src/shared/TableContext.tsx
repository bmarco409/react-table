import { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from 'react';
import { Pagination } from '../interfaces/pagination';
import { Maybe, Setter } from '../utils/customTypes';

export interface ITableContext {
    readonly pageSizeOptions: Maybe<number[]>;
    readonly setPageSizeOptions: (values: number[]) => void;
    readonly pagination: Maybe<Pagination>;
    readonly setPagination: (values: Maybe<Pagination>) => void;
}

export const TableContext = createContext<ITableContext>({
    pageSizeOptions: undefined,
    setPageSizeOptions: (_values: number[]): void => {
        throw new Error(`method not implemented`);
    },
    pagination: undefined,
    setPagination: (_value: Maybe<Pagination>): void => {
        throw new Error(`method not implemented`);
    },
});

export const useTableContext = (): ITableContext => {
    return useContext(TableContext);
};

const usePageSizeOptions = (values: Maybe<number[]>): [Maybe<number[]>, Setter<Maybe<number[]>>] => {
    const [pageSizeOptions, setPageSizeOptions] = useState<Maybe<number[]>>(values);
    return [pageSizeOptions, setPageSizeOptions];
};

const usePagination = (value: Maybe<Pagination>): [Maybe<Pagination>, Setter<Maybe<Pagination>>] => {
    const [pagination, setPagination] = useState<Maybe<Pagination>>(value);
    return [pagination, setPagination];
};

const TableContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [pageSizeOptions, setPageSizeOptions] = usePageSizeOptions([]);

    const [pagination, setPagination] = usePagination({
        page: 1,
        pageSize: 0,
    });

    const memoizedPageSizeContext = useMemo(
        () => ({
            pageSizeOptions,
            setPageSizeOptions,
            pagination,
            setPagination,
        }),
        [pageSizeOptions, pagination],
    );
    return <TableContext.Provider value={memoizedPageSizeContext}>{children}</TableContext.Provider>;
};

export default TableContextProvider;
