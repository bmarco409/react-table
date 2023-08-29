import { FC, memo, ReactElement, ReactNode } from 'react';
import { IButton } from './button';
import './button.scss';
import { UseButton } from './useButton';

interface ITextButton extends IButton {
    readonly icon?: ReactNode;
    readonly label?: string;
    readonly onClick?: () => void;
}

const TextButtonComponent: FC<ITextButton> = ({ icon, label, size , onClick}): ReactElement => {
    const { buttonRef, style } = UseButton({ size });

    return (
        <>
            <button className="mdc-button mdc-button--icon-leading mdc-custom-button" style={style} ref={buttonRef} onClick={onClick}>
                <span className="mdc-button__ripple"></span>
                <span className="mdc-button__touch"></span>
                {icon && (
                    <i className="material-icons mdc-button__icon mdc-custom-button-icon" aria-hidden="true">
                        {icon}
                    </i>
                )}
                <span className="mdc-button__label">{label}</span>
            </button>
        </>
    );
};
export const TextButton = memo(TextButtonComponent);
