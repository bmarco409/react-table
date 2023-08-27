import { MDCRipple } from '@material/ripple/component';
import { FC, ReactElement, memo, useEffect, useRef } from 'react';
import { Maybe } from '../../utils/customTypes';
import './button.scss';

interface IOutlinedButton {
    readonly label: string;
    readonly icon?: ReactElement;
}

const ButtonComponent: FC<IOutlinedButton> = ({ icon, label }): ReactElement => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    let button: Maybe<MDCRipple> = undefined;
   
    useEffect(() => {
        if (buttonRef.current) {
            button = new MDCRipple(buttonRef.current);
            button.initialize()
            
        }
    }, [buttonRef]);

    return (
        <>
        <div className="mdc-touch-target-wrapper">

            <button className="mdc-button mdc-button--outlined mdc-button--icon-leading mdc-custom-button" ref={buttonRef}>
                <span className="mdc-button__ripple"></span>
                <span className="mdc-button__touch"></span>
                {icon && (
                    <i className="material-icons mdc-button__icon" aria-hidden="true">
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
