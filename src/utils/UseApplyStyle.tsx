import { all, always, equals, ifElse, isNotNil, reduce, sum } from 'ramda';
import { CSSProperties, ReactElement, useLayoutEffect, useState } from 'react';
import { ICoulmDefinition } from '../interfaces/column-def.interface';
import { TABLE_SCROLL_HORIZZONTAL } from './const';
import { Maybe } from './customTypes';

export const useApplyStyle = <T,>(
    columnsDefinitions: ICoulmDefinition<T>[],
    tableRef: React.RefObject<HTMLTableElement>,
    scrollHorizzontal?: boolean,
    checkboxSelection?: boolean,
): {
    tableStyle: CSSProperties;
    emptyCell: ReactElement;
    emptyHeader: ReactElement;
} => {
    const sumColumnWidth = (total: number, column: ICoulmDefinition<T>): number => sum([total, column.width ?? 0]);
    const allFixedColumns = all((data: ICoulmDefinition<T>): boolean => isNotNil(data.width), columnsDefinitions);
    const [tableWidth, setTableWidth] = useState<number>(0);
    const checkboxWidth = ifElse(equals<Maybe<boolean>>(true), always(44), always(0))(checkboxSelection);

    const sumColumnsWisth = checkboxWidth + reduce(sumColumnWidth, 0, columnsDefinitions);
    const calculateTableWidth = (): Maybe<number> => {
        return ifElse(equals<Maybe<boolean>>(false), always(undefined), always(sumColumnsWisth))(scrollHorizzontal);
    };
    useLayoutEffect(() => {
        console.log('table width layout', tableRef?.current?.clientWidth);
        setTableWidth(tableRef?.current?.clientWidth ?? 0);
    }, []);

    const emptyCell = (): ReactElement => {
        if (allFixedColumns && sumColumnsWisth < tableWidth) {
            return <td className={`mdc-data-table__cell`} key={`empty`} style={{ width: 'auto' }} role="cell" />;
        }
        return <></>;
    };
    const emptyHeader = (): ReactElement => {
        if (allFixedColumns && sumColumnsWisth < tableWidth) {
            return <th className={`mdc-data-table__header-cell`} role="columnheader" scope="col" key={'empty'} />;
        }
        return <></>;
    };

    const tableStyle: CSSProperties = {
        overflowX: scrollHorizzontal ? 'auto' : TABLE_SCROLL_HORIZZONTAL,
        width: calculateTableWidth(),
    };

    return { tableStyle, emptyCell: emptyCell(), emptyHeader: emptyHeader() };
};
