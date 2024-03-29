import {
    addIndex,
    always,
    anyPass,
    append,
    curry,
    equals,
    find,
    ifElse,
    isNil,
    isNotNil,
    map,
    pick,
    pluck,
    reject,
    whereEq,
} from 'ramda';
import { CSSProperties, ReactElement, createRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { ICoulmDefinition, RowId } from '../../interfaces/column-def.interface';
import { IHeader } from '../../interfaces/header';
import { Order } from '../../interfaces/order';
import { Pagination } from '../../interfaces/pagination';
import { UseApplyStyle } from '../../utils/UseApplyStyle';
import { useResize } from '../../utils/UseResize';
import { Maybe, primitive } from '../../utils/customTypes';
import { found } from '../../utils/function';
import { HeaderCell } from '../header/HeaderCell';
import { CheckBoxInputComponent } from '../input/CheckBoxInput';
import { Paginator } from '../paginator/Paginator';
import { LinearProgressBar } from '../progressBar/LinearProgressBar';
import './table.scss';

export interface ITableComponent<T> {
    readonly columnsDefinitions: ICoulmDefinition<T>[];
    readonly rows: object[];
    readonly pageSizeOptions: number[];
    readonly paginationModel: Pagination;
    readonly checkboxSelection?: boolean;
    readonly showHeaderMenu?: boolean;
    readonly loading?: boolean;
    readonly rowCount?: number;
    readonly onPaginationModelChange?: (model: Pagination) => void;
    readonly scrollHorizzontal?: boolean;
    readonly onSortClick?: (value: Order) => void;
    readonly onRowSelectionModelChange?: (rows: RowId[]) => void;
}

export const TableComponent = <T,>({
    columnsDefinitions,
    rows,
    paginationModel,
    checkboxSelection,
    pageSizeOptions,
    showHeaderMenu,
    loading,
    rowCount,
    onPaginationModelChange,
    scrollHorizzontal,
    onSortClick,
    onRowSelectionModelChange,
}: ITableComponent<T>): ReactElement => {
    const [allRowsSelected, setAllRowsSelected] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<RowId[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    const mapRowsWithIndex = addIndex<object, number>(map);

    const { emptyCell, emptyHeader, tableStyle } = UseApplyStyle(
        columnsDefinitions,
        tableRef,
        scrollHorizzontal,
        checkboxSelection,
    );

    const rowsIndexValues = useCallback(() => {
        return mapRowsWithIndex((_val: object, index: number) => index, rows);
    }, [rows]);

    /***render header (HeaderComponent) */

    const pickHeaderData: (data: ICoulmDefinition<T>) => IHeader = pick(['headerName', 'sortable', 'field']);

    const parseHeader = (column: ICoulmDefinition<T>): IHeader => ({
        ...pickHeaderData(column),
        ref: createRef<HTMLTableCellElement>(),
    });

    const getHeaderInfo = map(parseHeader, columnsDefinitions);

    const headers = getHeaderInfo;

    const { activeIndex, onMouseDown } = useResize({ tableRef, columnsDefinitions, headers });

    const isSortable = anyPass([isNil, equals(true)]) as (value: Maybe<boolean>) => boolean;

    const setSortableClass = ifElse(isSortable, always('mdc-data-table__header-cell--with-sort'), always(''));

    const onCheckBoxChange = (value: RowId): void => {
        const updatedSelected = ifElse(
            isNotNil,
            always(reject<RowId, RowId[]>(equals(value), selectedRows)),
            always(append(value, selectedRows)),
        )(found<RowId>(value, selectedRows));
        setSelectedRows(updatedSelected);
    };

    const onHeaderCheckBoxChange = (_value: RowId): void => {
        setAllRowsSelected((oldValue) => !oldValue);
    };

    useEffect(() => {
        allRowsSelected ? setSelectedRows(rowsIndexValues()) : setSelectedRows([]);
    }, [allRowsSelected]);

    useEffect(() => {
        onRowSelectionModelChange?.(selectedRows);
    }, [selectedRows]);

    const renderHeaderCell = (data: IHeader, index: number): ReactElement => (
        <th
            className={`mdc-data-table__header-cell ${setSortableClass(data.sortable)} mdc-custom-header-cell`}
            role="columnheader"
            scope="col"
            key={data.headerName}
            ref={data.ref}
        >
            <HeaderCell
                label={data.headerName}
                showSortable={isSortable(data.sortable)}
                showMenu={showHeaderMenu}
                field={data.field}
                onSortClick={onSortClick}
                className={`resize-handle ${activeIndex === index ? 'active' : 'idle'}`}
                onMove={(): void => onMouseDown(index)}
            />
        </th>
    );

    const mapHeadersWithIndex = addIndex<IHeader, ReactElement>(map);

    const renderHeader = mapHeadersWithIndex(renderHeaderCell, getHeaderInfo);

    const headerCheckBox = (): ReactElement => {
        return (
            <th
                className="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox mdc-custom-header-checkbox"
                role="columnheader"
                scope="col"
            >
                <div className={`mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox`}>
                    <CheckBoxInputComponent value={'ALL'} onChange={onHeaderCheckBoxChange} />
                </div>
            </th>
        );
    };

    /**** render Body (BodyComponent)*/

    const rowCheckBox = (_element: object, rowIndex: number): ReactElement => {
        const setSelected = ifElse(isNil, always(false), always(true));
        return (
            <td className="mdc-data-table__cell mdc-data-table__cell--checkbox mdc-custom-checkbox-cell" role="cell">
                <div className="mdc-checkbox mdc-data-table__row-checkbox">
                    <CheckBoxInputComponent
                        value={rowIndex}
                        checked={setSelected(found(rowIndex, selectedRows))}
                        onChange={onCheckBoxChange}
                    />
                </div>
            </td>
        );
    };

    const valueKeys = pluck('field', columnsDefinitions);

    const renderCell = (element: object, row: number, field: string): ReactElement => {
        const column = find(whereEq({ field: field }), columnsDefinitions);
        const isValueGetter = isNotNil(column?.valueGetter);

        const cellValue = element[field as keyof typeof element] as Maybe<primitive>;
        const renderActions = column?.getActions?.({ id: row, row: row });

        const renderValue = ifElse(
            equals(true),
            always(column?.valueGetter?.({ element: element as T })),
            always(cellValue),
        )(isValueGetter);

        const isActions = ifElse(equals('actions'), always(renderActions), always(renderValue));

        const style: CSSProperties = {
            maxWidth: column?.maxWidth ?? 'auto',
            width: column?.width ?? 'auto',
            minWidth: column?.minWidth ?? 'auto',
        };

        return (
            <td
                className={`mdc-data-table__cell ${column?.cellClassName} td_${field}`}
                key={`${field}_${cellValue}`}
                title={cellValue?.toString()}
                style={style}
                role="cell"
            >
                {isActions(field)}
            </td>
        );
    };

    const curriedRenderCell = curry(renderCell);

    const prepareRow = (obj: object, row: number): unknown => map(curriedRenderCell(obj, row), valueKeys);

    const renderRows = rows.map((element, index) => {
        return (
            <tr className="mdc-data-table__row" key={index}>
                {checkboxSelection && rowCheckBox(element, index)}
                <>{prepareRow(element, index)}</>
                {emptyCell}
            </tr>
        );
    });

    /****** */

    return (
        <>
            <div className="mdc-data-table" >
                <div className="mdc-data-table__table-container" >
                    <table className="mdc-data-table__table" ref={tableRef} style={tableStyle}>
                        <thead>
                            <tr className="mdc-data-table__header-row">
                                {checkboxSelection && headerCheckBox()}
                                {renderHeader}
                                {emptyHeader}
                            </tr>
                        </thead>
                        <tbody className="mdc-data-table__content">{renderRows}</tbody>
                    </table>
                </div>
                {loading && <LinearProgressBar />}
                <Paginator
                    total={rowCount ?? 0}
                    pagination={paginationModel}
                    pageSizeOptions={pageSizeOptions}
                    onPaginationModelChange={onPaginationModelChange}
                />
            </div>
        </>
    );
};

export const Table = memo(TableComponent);
