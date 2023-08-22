import { isNotNil, nth } from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import { ICoulmDefinition } from '../interfaces/column-def.interface';
import { IHeader } from '../interfaces/header';
import { Nullable } from './customTypes';

export const useResize = <T>({
    columnsDefinitions,
    headers,
}: {
    columnsDefinitions: ICoulmDefinition<T>[];
    headers: IHeader[];
}): { activeIndex: Nullable<number>; onMouseDown: (index: number) => void } => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const mouseMove = useCallback(
        (e: MouseEvent) => {
            const column = nth(activeIndex ?? 1000, headers);

            if (isNotNil(column)) {
                const values = Array.from(document.getElementsByClassName(`td_${column.field}`));
                const mousePosition = e.clientX;
                const elementPostiion = column.ref?.current?.getBoundingClientRect();
                const delta = mousePosition - (elementPostiion?.right ?? 0);

                const width = (column.ref?.current?.offsetWidth ?? 0) + delta;

                values.forEach((element) => {
                    if (element instanceof HTMLElement) {
                        element.style.width = `${width}px`;
                        element.style.maxWidth = `${width}px`;
                    }
                });
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
