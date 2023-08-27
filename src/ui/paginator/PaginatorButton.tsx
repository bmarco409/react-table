import { MDCRipple } from '@material/ripple/component';
import { FC, ReactElement, ReactNode, memo, useEffect, useRef } from 'react';
import './paginatorButton.scss';

interface IPaginatorComponent {
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly onClick?: () => void;
}

const PaginatorButtonComponent: FC<IPaginatorComponent> = ({ children, disabled, onClick }): ReactElement => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const rippleButton = new MDCRipple(buttonRef.current);
            rippleButton.activate;
            rippleButton.unbounded = true;
        }
    }, [buttonRef]);

    return (
        <>
            <button
                className="mdc-data-table__pagination-button mdc-custom-pagination-button mdc-ripple-surface"
                ref={buttonRef}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
};

export const PaginatorButton = memo(PaginatorButtonComponent);
