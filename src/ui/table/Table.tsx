import { always, anyPass, compose, curry, equals, find, ifElse, isNil, map, pick, pluck, whereEq } from 'ramda';
import { ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { Pagination } from '../../interfaces/pagination';
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
    readonly onPaginationModelChange?: (model: Pagination) =>void;
}
interface IHeader {
    readonly headerName: string;
    readonly sortable?: boolean;
    readonly showHeaderMenu?: boolean;
}

interface CellValue {
    value: primitive;
    key: string; // is the field in ICoulmDefinition
}

const TableComponent = <T,>({
    columnsDefinitions,
    rows,
    paginationModel,
    checkboxSelection,
    pageSizeOptions,
    showHeaderMenu,
    loading,
    rowCount,
    onPaginationModelChange
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

    const getValue = (element: object, field: string): CellValue => {
        return { value: element[field as keyof typeof element], key: field, }
    };

    const prepareCell = (data: CellValue): ReactElement => {
        const element = find(whereEq({ 'field': data.key}),columnsDefinitions);
        const content = ifElse(equals('actions'),always(element?.getActions?.({id: element.field ,row: 1})), always(data.value))
        return <td 
                className={`mdc-data-table__cell ${element?.cellClassName}`} 
                key={`${data.key}_${data.value}`} title={data.value?.toString()}>
                {content(data.key)}
            </td>
    };

    const renderCell = curry(compose(prepareCell, getValue));

    const prepareRow = (obj: object): unknown => map(renderCell(obj), valueKeys);

    const renderRows = rows.map((element, index) => {
        return (
            <tr className="mdc-data-table__row" key={index}>
                {checkboxSelection && rowCheckBox()}
                <>{prepareRow(element)}</>
            </tr>
        );
    });

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
                <Paginator total={rowCount ?? 0}  pagination={paginationModel} pageSizeOptions={pageSizeOptions} onPaginationModelChange={onPaginationModelChange}/>
            </div>
        </>
    );
};

export const Table = memo(TableComponent);
