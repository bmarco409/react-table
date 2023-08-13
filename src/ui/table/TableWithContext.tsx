import { FC, ReactElement, memo } from 'react';
import TableContextProvider from '../../shared/TableContext';
import { ITableComponent, Table } from './Table';

const DataTableComponent: FC<ITableComponent> = ({
    columnsDefinitions,
    rows,
    pagSize,
    pageSizeOptions,
    checkboxSelection,
    showHeaderMenu,
    loading,
    rowCount,
    paginationModel,
    onPaginationModelChange,
}): ReactElement => {
    return (
        <>
            <TableContextProvider>
                <Table
                    columnsDefinitions={columnsDefinitions}
                    rows={rows}
                    pagSize={pagSize}
                    pageSizeOptions={pageSizeOptions}
                    checkboxSelection={checkboxSelection}
                    showHeaderMenu={showHeaderMenu}
                    loading={loading}
                    rowCount={rowCount}
                    paginationModel={paginationModel}
                    onPaginationModelChange={onPaginationModelChange}
                />
            </TableContextProvider>
        </>
    );
};

export const DataTable = memo(DataTableComponent);
