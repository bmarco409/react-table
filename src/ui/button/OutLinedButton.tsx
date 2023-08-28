import { FC, ReactElement, memo } from 'react';
import { IButton } from './button';
import './button.scss';
import { UseButton } from './useButton';

interface IOutlinedButton extends IButton {
    readonly label: string;
    readonly icon?: ReactElement;
}

const ButtonComponent: FC<IOutlinedButton> = ({ icon, label, size }): ReactElement => {
    const { buttonRef, style } = UseButton({ size });

    return (
        <>
            <div className="mdc-touch-target-wrapper">
                <button
                    className="mdc-button mdc-button--outlined mdc-button--icon-leading mdc-custom-button"
                    ref={buttonRef}
                    style={style}
                >
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__touch"></span>
                    {icon && (
                        <i className="material-icons mdc-button__icon mdc-custom-button-icon" aria-hidden="true">
                            {icon}
                        </i>
                    )}
                    <span className="mdc-button__label">{label}</span>
                </button>
            </div>
        </>
    );
};

export const OutlinedButton = memo(ButtonComponent);
