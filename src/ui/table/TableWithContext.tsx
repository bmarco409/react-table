import { FC, ReactElement, memo } from "react";
import TableContextProvider from "../../shared/TableContext";
import { ITableComponent, Table } from "./Table";

const DataTableComponent :FC<ITableComponent> = ({
    columnsDefinitions,
    data,
    pagSize,
    pageSizeOptions,
    checkboxSelection,
    showHeaderMenu,
    loading,
}): ReactElement =>{
    return(
        <>
            <TableContextProvider>
            <Table 
                columnsDefinitions={columnsDefinitions} 
                data={data} 
                pagSize={pagSize} 
                pageSizeOptions={pageSizeOptions}
                checkboxSelection={checkboxSelection}
                showHeaderMenu={showHeaderMenu}
                loading={loading} />
            </TableContextProvider>
        </>
    )
}

export const DataTable = memo(DataTableComponent)