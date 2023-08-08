import { always, anyPass, compose, curry, equals, ifElse, isNil, map, pick, pluck } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { Maybe, primitive } from '../../utils/customTypes';
import { SortButton } from '../header/SortButton';
import { CheckBoxInputComponent } from '../input/CheckBoxInput';
import { Paginator } from '../paginator/Paginator';
import './table.scss';

interface ITableComponent {
    readonly columnsDefinitions: ICoulmDefinition[];
    readonly data: object[];
    readonly pagSize: number;
    readonly checkboxSelection?: boolean;
}
interface IHeaderCell {
    readonly headerName: string;
    readonly sortable?: boolean;
}

const TableComponent: FC<ITableComponent> = ({
    columnsDefinitions,
    data,
    pagSize,
    checkboxSelection,
}): ReactElement => {
    /***render header (HeaderComponent) */

    const pickHeaderAndSortable: (data: ICoulmDefinition) => IHeaderCell = pick(['headerName', 'sortable']);

    const getHeaderAndSortable = map(pickHeaderAndSortable)(columnsDefinitions);

    const isSortable = anyPass([isNil, equals(true)]) as  (value: Maybe<boolean>) => boolean;

    const setSortableClass = ifElse(isSortable, always('mdc-data-table__header-cell--with-sort'), always(''));

    const renderHeaderCell = (data: IHeaderCell): ReactElement => (
        <th
            className={`mdc-data-table__header-cell ${setSortableClass(data.sortable)}`}
            role="columnheader"
            scope="col"
            key={data.headerName}
        >
           {isSortable(data.sortable)  ? <SortButton label={data.headerName}/> : data.headerName}

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

    const getValue = (element: object, key: string): primitive => element[key as keyof typeof element];

    const prepareCell = (value: primitive): ReactElement => (
        <td className="mdc-data-table__cell" key={value}>
            {value}
        </td>
    );

    const renderCell = curry(compose(prepareCell, getValue));

    const prepareRow = (obj: object): unknown => map(renderCell(obj), valueKeys);

    const renderRows = data.map((element, index) => {
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
                <Paginator pageSize={pagSize} />
            </div>
        </>
    );
};

export const Table = memo(TableComponent);
