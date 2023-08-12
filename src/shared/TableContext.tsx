import { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from 'react';
import { Maybe, Setter } from '../utils/customTypes';

export interface ITableContext {
    pageSizeOptions: Maybe<number[]>;
    setPageSizeOptions: (values: number[]) => void;
}

export const TableContext = createContext<ITableContext>({
    pageSizeOptions: undefined,
    setPageSizeOptions: (_values: number[]): void => {
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

const TableContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [pageSizeOptions, setPageSizeOptions] = usePageSizeOptions([]);

    const memoizedPageSizeContext = useMemo(
        () => ({
            pageSizeOptions,
            setPageSizeOptions,
        }),
        [pageSizeOptions],
    );
    return <TableContext.Provider value={memoizedPageSizeContext}>{children}</TableContext.Provider>;
};

export default TableContextProvider;
