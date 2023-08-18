import { FC, ReactElement, memo } from 'react';
import './button.scss';

interface IOutlinedButton {
    readonly label: string;
    readonly icon?: ReactElement;
}

const ButtonComponent: FC<IOutlinedButton> = ({ icon, label }): ReactElement => {
    return (
        <>
            <button className="mdc-button mdc-button--outlined mdc-button--icon-leading">
                <span className="mdc-button__ripple"></span>
                {icon && (
                    <i className="material-icons mdc-button__icon" aria-hidden="true">
                        {icon}
                    </i>
                )}
                <span className="mdc-button__label">{label}</span>
            </button>
        </>
    );
};

export const OutlinedButton = memo(ButtonComponent);
