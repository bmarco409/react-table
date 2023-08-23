import { find, isNotNil, lt, lte, nth, whereEq } from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ICoulmDefinition } from '../interfaces/column-def.interface';
import { IHeader } from '../interfaces/header';
import { Nullable } from './customTypes';

export const useResize = <T>({
    tableRef,
    columnsDefinitions,
    headers,
}: {
    tableRef: React.RefObject<HTMLTableElement>,
    columnsDefinitions: ICoulmDefinition<T>[];
    headers: IHeader[];
}): { activeIndex: Nullable<number>; onMouseDown: (index: number) => void } => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const tableMinWidth = useMemo(() => (tableRef.current?.offsetWidth ?? 0) +20,[headers]);
    console.log('tableWidth', tableMinWidth)
    const mouseMove = useCallback(
        (e: MouseEvent) => {
            const column = nth(activeIndex ?? 1000, headers);

            if (isNotNil(column)) {
                const values = Array.from(document.getElementsByClassName(`td_${column.field}`));
                const columnDef = find(whereEq({ field: column.field }), columnsDefinitions);
                const mousePosition = e.clientX;
                const elementPostiion = column.ref?.current?.getBoundingClientRect();
                const delta = mousePosition - (elementPostiion?.right ?? 0);
                const width = (column.ref?.current?.offsetWidth ?? 0) + delta;
                const maxWidth =  columnDef?.maxWidth ?? Number.MAX_SAFE_INTEGER;
                values.forEach((element) => {
                    if (element instanceof HTMLElement && lte(width,maxWidth)) {
                        element.style.width = `${width}px`;
                        // element.style.maxWidth = `${width}px`;
                        // element.style.minWidth = `${width}px`;
                    }
                });
                const tableWidth = (tableRef.current?.offsetWidth ?? 0 )+ delta;
                if(tableRef.current?.style !==undefined ){
                    console.log(tableMinWidth)
                    console.log(tableWidth)
                    if(lt(tableMinWidth,tableWidth)){
                        console.log('grande')
                        tableRef.current.style.width = `${tableWidth}px`;
                    }else{
                        console.log('piccolo')
                        tableRef.current.style.width = ``;
                    }                 
                }
                console.log('table', tableWidth);
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
