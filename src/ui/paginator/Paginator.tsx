import { equals } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { useTableContext } from '../../shared/TableContext';
import { LeftIcon } from '../icons/LeftIcon';
import { PageFirstIcon } from '../icons/PageFIrst';
import { PageLastIcon } from '../icons/PageLast';
import { RightIcon } from '../icons/RightIcon';
import { Select } from '../input/Select';
import { PaginatorButton } from './PaginatorButton';

interface IPaginator {
    readonly total?: number;
}

const PaginatorComponent: FC<IPaginator> = ({ total }): ReactElement => {
    const tableContext = useTableContext();

    console.info(tableContext.pagination)

    const isFirstPage = equals(tableContext.pagination?.page,0);
    const isLastPage = equals(tableContext.pagination?.page,0);

    return (
        <>
            <div className="mdc-data-table__pagination">
                <div className="mdc-data-table__pagination-trailing">
                    <div className="mdc-data-table__pagination-rows-per-page">
                        <div className="mdc-data-table__pagination-rows-per-page-label">Righe per pagina</div>

                        <Select values={tableContext.pageSizeOptions ?? []} />
                    </div>

                    <div className="mdc-data-table__pagination-navigation">
                        <div className="mdc-data-table__pagination-total">
                            {(tableContext.pagination?.page ?? 0) +1}‑{tableContext.pagination?.pageSize ?? 0} di {total}</div>
                        <PaginatorButton disabled={isFirstPage}>
                            <PageFirstIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton>
                            <LeftIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton>
                            <RightIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                        <PaginatorButton>
                            <PageLastIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </PaginatorButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Paginator = memo(PaginatorComponent);
