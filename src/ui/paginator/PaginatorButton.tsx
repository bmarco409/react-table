import { MDCRipple } from '@material/ripple/component';
import { FC, ReactElement, ReactNode, memo, useRef } from 'react';
import './paginatorButton.scss';

interface IPaginatorComponent {
    readonly children: ReactNode;
    readonly disabled?: boolean;
}

const PaginatorButtonComponent: FC<IPaginatorComponent> = ({ children , disabled}): ReactElement => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    if (buttonRef.current) {
        const rippleButton = new MDCRipple(buttonRef.current);
        rippleButton.activate;
        rippleButton.unbounded = true;
    }

    return (
        <>
            <button
                className="mdc-data-table__pagination-button mdc-custom-pagination-button mdc-ripple-surface"
                ref={buttonRef}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
};

export const PaginatorButton = memo(PaginatorButtonComponent);
