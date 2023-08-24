import { compose, find, isNotNil, lt, lte, nth, replace, trim, whereEq } from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ICoulmDefinition } from '../interfaces/column-def.interface';
import { IHeader } from '../interfaces/header';
import { Nullable } from './customTypes';

export const useResize = <T>({
    tableRef,
    columnsDefinitions,
    headers,
}: {
    tableRef: React.RefObject<HTMLTableElement>;
    columnsDefinitions: ICoulmDefinition<T>[];
    headers: IHeader[];
}): { activeIndex: Nullable<number>; onMouseDown: (index: number) => void } => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const tableMinWidth = useMemo(() => (tableRef.current?.offsetWidth ?? 0) , [headers]);
    let lastPosition =  0;
    let delta = 0;
    const mouseMove = useCallback(
        (e: MouseEvent) => {

            const column = nth(activeIndex ?? 1000, headers);
            if (isNotNil(column)) {
                console.log(column.field);
                const values = Array.from(document.getElementsByClassName(`td_${column.field}`));
                const columnDef = find(whereEq({ field: column.field }), columnsDefinitions);
                let width = column.ref?.current?.offsetWidth ?? 0;
                console.log('base width',width)
                //**** */
                console.log(columnDef?.field)
                const direction = mouseDirection(e,lastPosition);
                if(lastPosition === 0){
                    delta = 0;
                }else if (direction === 'RIGHT'){
                    delta = Math.abs(e.pageX -lastPosition)
                }else{
                    delta =e.pageX -lastPosition;
                    console.log('width delta', delta)
                }
                
                /**** */
                width += delta;
               // const width = (column.ref?.current?.offsetWidth ?? 0) + delta;
                const maxWidth = columnDef?.maxWidth ?? Number.MAX_SAFE_INTEGER;

                console.log('width',width)

                values.forEach((element) => {
                    if (element instanceof HTMLElement && lte(width, maxWidth)) {
                        element.style.width = `${width}px`;
                        element.style.maxWidth = `${width}px`;
                        element.style.minWidth = `${width}px`;
                    }
                });
             
                const tableWidth = getTableWidth(tableRef) + delta;
                console.log('tablewidth',tableWidth)
                
                if (tableRef.current?.style !== undefined) {
                    console.log('test dir', direction);
                    if (lt(tableMinWidth, tableWidth)) {
                        console.log('test');
                        tableRef.current.style.width = `${tableWidth}px`;
                        
                    } else {
                        console.log('test1');
                        
                        tableRef.current.style.width = `${tableWidth -1}px`;
                    }
                   
                   
                }
                lastPosition = e.pageX
                //console.log('delta', delta);
                // console.log('super delta', delta);
                // console.log('table', tableRef.current?.offsetWidth);
                // console.log('total', (tableRef.current?.offsetWidth ?? 0) + (delta));
            }
        },
        [activeIndex, columnsDefinitions],
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    const onMouseDown = (index: number): void => {
        setActiveIndex(index);
    };

    return {
        activeIndex,
        onMouseDown,
    };
};

type Direction = 'RIGHT' | 'LEFT';

const mouseDirection = (e: MouseEvent, lastPosition: number): Direction => {
    if (e.pageX >= lastPosition) {
        return 'RIGHT';
    } else {
        return 'LEFT';
    }
};


const getTableWidth = (table:  React.RefObject<HTMLTableElement>): number =>{
    const styleWidth =pixelStyleAsNUmber(table?.current?.style.width ?? '');
    if( styleWidth > 0){
        return styleWidth;
    }
    return table.current?.offsetWidth ?? 0;
}
const pixelStyleAsNUmber = compose(
    Number,
    replace('px',''),
    trim
)