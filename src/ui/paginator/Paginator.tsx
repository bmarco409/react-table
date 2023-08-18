import { add, always, equals, ifElse, subtract } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { Pagination } from '../../interfaces/pagination';
import { add1, subtract1 } from '../../utils/function';
import { LeftIcon } from '../icons/LeftIcon';
import { PageFirstIcon } from '../icons/PageFirst';
import { PageLastIcon } from '../icons/PageLast';
import { RightIcon } from '../icons/RightIcon';
import { Select } from '../input/Select';
import { PaginatorButton } from './PaginatorButton';

interface IPaginator {
    readonly pagination: Pagination;
    readonly pageSizeOptions: number[];
    readonly total: number;
    readonly onPaginationModelChange?: (model: Pagination) => void;
}

const PaginatorComponent: FC<IPaginator> = ({
    total,
    pagination,
    pageSizeOptions,
    onPaginationModelChange,
}): ReactElement => {
    const lastPage = subtract1(Math.ceil(total / pagination.pageSize));

    const isFirstPage = equals(pagination?.page, 0);
    const isLastPage = equals(pagination?.page, lastPage);

    const firstElementPage = ifElse(
        equals(true),
        always(add1(pagination.page)),
        always(add1(pagination.page * pagination.pageSize)),
    )(isFirstPage);

    const lastElementPage = ifElse(
        equals(true),
        always(total),
        always(subtract(add(firstElementPage, +pagination.pageSize), 1)),
    )(isLastPage);

    const onPageSizeOptionsValueChange = (value: number): void => {
        onPaginationModelChange?.({
            ...pagination,
            pageSize: value,
        });
    };

    const onNextPageClick = (): void => {
        onPaginationModelChange?.({
            ...pagination,
            page: add1(pagination.page),
        });
    };

    const onPrevPageClick = (): void => {
        onPaginationModelChange?.({
            ...pagination,
            page: subtract1(pagination.page),
        });
    };

    const onFirstPageClick = (): void => {
        onPaginationModelChange?.({
            ...pagination,
            page: 0,
        });
    };

    const onLastPageClick = (): void => {
        onPaginationModelChange?.({
            ...pagination,
            page: lastPage,
        });
    };

    return (
        <>
            <div className="mdc-data-table__pagination">
                <div className="mdc-data-table__pagination-trailing">
                    <div className="mdc-data-table__pagination-rows-per-page">
                        <div className="mdc-data-table__pagination-rows-per-page-label">Righe per pagina</div>

                        <Select
                            values={pageSizeOptions ?? [10, 20, 30]}
                            onValueChange={onPageSizeOptionsValueChange}
                            selectedValue={pagination.pageSize}
                        />
                    </div>

                    <div className="mdc-data-table__pagination-navigation">
                        <div className="mdc-data-table__pagination-total">
                            {firstElementPage}‑{lastElementPage} di {total}
                        </div>
                        <PaginatorButton disabled={isFirstPage} onClick={onFirstPageClick}>
                            <PageFirstIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton onClick={onPrevPageClick} disabled={isFirstPage}>
                            <LeftIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton onClick={onNextPageClick} disabled={isLastPage}>
                            <RightIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton disabled={isLastPage} onClick={onLastPageClick}>
                            <PageLastIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Paginator = memo(PaginatorComponent);
