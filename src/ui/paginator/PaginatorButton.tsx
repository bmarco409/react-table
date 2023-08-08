import { FC, ReactElement, ReactNode, memo } from 'react';
import useRipple from 'use-ripple-hook';
import './paginatorButton.scss';

interface IPaginatorComponent {
    readonly children: ReactNode;
}

const PaginatorButtonComponent: FC<IPaginatorComponent> = ({ children }): ReactElement => {
    const [ripple, event] = useRipple({ color: '#9E9E9E', duration: 1200 });

    return (
        <>
            <button
                ref={ripple}
                className="mdc-data-table__pagination-button mdc-custom-pagination-button"
                onMouseDown={event}
            >
                {children}
            </button>
        </>
    );
};

export const PaginatorButton = memo(PaginatorButtonComponent);
