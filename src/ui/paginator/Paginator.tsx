import { FC, ReactElement, memo } from 'react';
import { useTableContext } from '../../shared/TableContext';
import { LeftIcon } from '../icons/LeftIcon';
import { PageFirstIcon } from '../icons/PageFIrst';
import { PageLastIcon } from '../icons/PageLast';
import { RightIcon } from '../icons/RightIcon';
import { Select } from '../input/Select';
import { PaginatorButton } from './PaginatorButton';

interface IPaginator {
    readonly pageSize: number;
}

const PaginatorComponent: FC<IPaginator> = ({ pageSize }): ReactElement => {
    const tableContext = useTableContext();
    return (
        <>
            <div className="mdc-data-table__pagination">
                <div className="mdc-data-table__pagination-trailing">
                    <div className="mdc-data-table__pagination-rows-per-page">
                        <div className="mdc-data-table__pagination-rows-per-page-label">Righe per pagina</div>

                        <Select values={tableContext.pageSizeOptions ?? []} />
                    </div>

                    <div className="mdc-data-table__pagination-navigation">
                        <div className="mdc-data-table__pagination-total">1‑10 of 100</div>
                        <PaginatorButton>
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
