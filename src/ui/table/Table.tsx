import { ReactElement, FC, memo, ReactNode } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import {map, pluck, compose, curry, T} from 'ramda';
import './table.scss'
import { primitive } from '../../utils/customTypes';
import { PaginatorComponent } from '../paginator/Paginator';

interface ITableComponent {
    readonly columnsDefinitions: ICoulmDefinition[];
    readonly data: object[];
    readonly pagSize: number;
}

const Table: FC<ITableComponent> = ({ columnsDefinitions, data, pagSize }): ReactElement => {

    /***render header (HeaderComponent) */

    const headerNames = pluck('headerName',columnsDefinitions);


    const renderHeaderCell  = (name: string): ReactElement => <th key={name}>{name}</th>;

    const renderHeader = map(renderHeaderCell,headerNames);

    /**** render Body (BodyComponent)*/

    const valueKeys = pluck('field', columnsDefinitions);

    const getValue = (element: object,key: string): primitive => element[key as keyof typeof element];

    const prepareCell = (value: primitive): ReactElement => <td key={value}>{value}</td>

    const renderCell = curry(compose(prepareCell, getValue))

    const prepareRow = (obj: object):unknown => map(renderCell(obj),valueKeys)


    const renderRows = data.map((element, index) => {
            return (
                <tr key={index}>
                    <>
                        {prepareRow(element)}
                    </>
                </tr>
            )

    })

    /****** */

    return (
        <>
        
            <table className='rounded-corners'>
                <thead>
                    <tr key={'header'}>
                        {renderHeader}
                    </tr>
                </thead>
                <tbody>
                    {renderRows}
                </tbody>
            </table>
            <PaginatorComponent pageSize={pagSize}/>
        </>
    );
};

export const TableComponent =  memo(Table);