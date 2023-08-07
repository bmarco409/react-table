import { FC, ReactElement, memo } from 'react';

interface IPaginator {
    readonly pageSize: number;
}

const Paginator: FC<IPaginator> = ({ pageSize }): ReactElement => {
    return (
        <>
            <div>paginator</div>
        </>
    );
};

export const PaginatorComponent = memo(Paginator);
