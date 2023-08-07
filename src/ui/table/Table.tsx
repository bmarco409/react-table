import { compose, curry, map, pluck } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { primitive } from '../../utils/customTypes';
import './table.scss';

interface ITableComponent {
    readonly columnsDefinitions: ICoulmDefinition[];
    readonly data: object[];
    readonly pagSize: number;
}

const Table: FC<ITableComponent> = ({ columnsDefinitions, data, pagSize }): ReactElement => {

    /***render header (HeaderComponent) */

    const headerNames = pluck('headerName',columnsDefinitions);


    const renderHeaderCell  = (name: string): ReactElement => 
        <th className="mdc-data-table__header-cell" role="columnheader" scope="col" key={name}>{name}</th>;

    const renderHeader = map(renderHeaderCell,headerNames);

    /**** render Body (BodyComponent)*/

    const valueKeys = pluck('field', columnsDefinitions);

    const getValue = (element: object,key: string): primitive => element[key as keyof typeof element];

    const prepareCell = (value: primitive): ReactElement => 
        <td className='mdc-data-table__cell' key={value}>{value}</td>

    const renderCell = curry(compose(prepareCell, getValue))

    const prepareRow = (obj: object):unknown => map(renderCell(obj),valueKeys)


    const renderRows = data.map((element, index) => {
            return (
                <tr className='mdc-data-table__row'  key={index}>
                    <>
                        {prepareRow(element)}
                    </>
                </tr>
            )

    })

    /****** */

    return (
        <>
            <div className="mdc-data-table">
                <div className="mdc-data-table__table-container">
                    <table className="mdc-data-table__table">
                        <thead>
                            <tr className="mdc-data-table__header-row" key={'header'}>
                                {renderHeader}
                            </tr>
                        </thead>
                        <tbody className="mdc-data-table__content">
                            {renderRows}
                        </tbody>
                    </table>
                    {/* <PaginatorComponent pageSize={pagSize}/> */}
                </div>
            </div>
    
        </>
    );
};

export const TableComponent =  memo(Table);