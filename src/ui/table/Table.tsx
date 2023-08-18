import {
    always,
    anyPass,
    compose,
    curry,
    equals,
    find,
    ifElse,
    isNil,
    isNotNil,
    map,
    pick,
    pluck,
    whereEq,
} from 'ramda';
import { CSSProperties, ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { Pagination } from '../../interfaces/pagination';
import { CELL_DEFAULT_MIN_WIDTH, CELL_DEFAULT_WIDTH } from '../../utils/const';
import { Maybe, primitive } from '../../utils/customTypes';
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
}
interface IHeader {
    readonly headerName: string;
    readonly sortable?: boolean;
    readonly showHeaderMenu?: boolean;
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
}: ITableComponent<T>): ReactElement => {
    /***render header (HeaderComponent) */

    const pickHeaderAndSortable: (data: ICoulmDefinition<T>) => IHeader = pick(['headerName', 'sortable']);

    const getHeaderAndSortable = map(pickHeaderAndSortable)(columnsDefinitions);

    const isSortable = anyPass([isNil, equals(true)]) as (value: Maybe<boolean>) => boolean;

    const setSortableClass = ifElse(isSortable, always('mdc-data-table__header-cell--with-sort'), always(''));

    const renderHeaderCell = (data: IHeader): ReactElement => (
        <th
            className={`mdc-data-table__header-cell ${setSortableClass(data.sortable)} mdc-custom-header-cell`}
            role="columnheader"
            scope="col"
            key={data.headerName}
        >
            <HeaderCell label={data.headerName} showSortable={isSortable(data.sortable)} showMenu={showHeaderMenu} />
        </th>
    );

    const renderHeader = map(renderHeaderCell, getHeaderAndSortable);

    const headerCheckBox = (): ReactElement => {
        return (
            <th
                className="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox"
                role="columnheader"
                scope="col"
            >
                <div className="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox">
                    <CheckBoxInputComponent />
                </div>
            </th>
        );
    };

    /**** render Body (BodyComponent)*/

    const rowCheckBox = (): ReactElement => {
        return (
            <td className="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div className="mdc-checkbox mdc-data-table__row-checkbox">
                    <CheckBoxInputComponent />
                </div>
            </td>
        );
    };

    const valueKeys = pluck('field', columnsDefinitions);

    const prepareCell = (element: object, row: number, field: string): ReactElement => {
        const column = find(whereEq({ field: field }), columnsDefinitions);
        const isValueGetter = isNotNil(column?.valueGetter);

        const cellValue = element[field as keyof typeof element] as Maybe<primitive>;
        const renderActions = column?.getActions?.({ id: row, row: row });

        const renderValue = ifElse(
            equals(true),
            always(column?.valueGetter?.({ row: element as T })),
            always(cellValue),
        )(isValueGetter);

        const isActions = ifElse(equals('actions'), always(renderActions), always(renderValue));

        const style: CSSProperties = {
            maxWidth: column?.maxWidth,
            width: column?.maxWidth ?? CELL_DEFAULT_WIDTH,
            minWidth: column?.minWidth ?? CELL_DEFAULT_MIN_WIDTH,
        };

        return (
            <td
                className={`mdc-data-table__cell ${column?.cellClassName}`}
                key={`${field}_${cellValue}`}
                title={cellValue?.toString()}
                style={style}
            >
                {isActions(field)}
            </td>
        );
    };

    const renderCell = curry(compose(prepareCell));

    const prepareRow = (obj: object, row: number): unknown => map(renderCell(obj, row), valueKeys);

    const renderRows = rows.map((element, index) => {
        return (
            <tr className="mdc-data-table__row" key={index}>
                {checkboxSelection && rowCheckBox()}
                <>{prepareRow(element, index)}</>
            </tr>
        );
    });

    /****** */

    return (
        <>
            <div className="mdc-data-table">
                <div className="mdc-data-table__table-container">
                    <table className="mdc-data-table__table">
                        <thead>
                            <tr className="mdc-data-table__header-row">
                                {checkboxSelection && headerCheckBox()}
                                {renderHeader}
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
